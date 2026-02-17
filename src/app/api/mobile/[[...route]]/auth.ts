import { Hono } from "hono";
import { sign } from "hono/jwt";
import { eq } from "drizzle-orm";
import { db } from "@/src/db/drizzle";
import { createId } from "@paralleldrive/cuid2";
import { OAuth2Client } from "google-auth-library";
import { HTTPException } from "hono/http-exception";
import { jwtVerify, createRemoteJWKSet } from "jose";
import { mobileUsers } from "@/src/db/schemas/mobile-users";
import { getMobileUserByEmail } from "@/src/data/mobile-user";
import { mobileUserRefreshTokens } from "@/src/db/schemas/mobile-user-refresh-tokens";

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const JWKS = createRemoteJWKSet(new URL("https://appleid.apple.com/auth/keys"));

const JWT_SECRET = process.env.JWT_SECRET_KEY!;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET_KEY ?? JWT_SECRET;

// seconds
const ACCESS_TOKEN_EXPIRES_IN = Number(
  process.env.ACCESS_TOKEN_EXPIRES_IN ?? 3600,
); // 1h

const REFRESH_TOKEN_EXPIRES_IN = Number(
  process.env.REFRESH_TOKEN_EXPIRES_IN ?? 60 * 60 * 24 * 30,
); // 30 days

const app = new Hono();

/* ---------------------
   Helpers
   --------------------- */

function splitFullName(name?: string | null) {
  if (!name) return { firstName: "", lastName: "" };

  const parts = name.trim().split(" ");
  const firstName = parts.shift() || "";
  const lastName = parts.join(" ") || "";

  return { firstName, lastName };
}

/**
 * Create a signed JWT access token (short lived)
 */
async function createAccessToken(user: any) {
  const now = Math.floor(Date.now() / 1000);
  const payload = {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    provider: user.provider,
    iat: now,
    exp: now + ACCESS_TOKEN_EXPIRES_IN,
  };

  const token = await sign(payload, JWT_SECRET);
  return { token, expiresIn: ACCESS_TOKEN_EXPIRES_IN };
}

/**
 * Create a signed refresh token (longer lived). We store it server-side as well.
 */
async function createRefreshToken(userId: string) {
  const now = Math.floor(Date.now() / 1000);
  const payload = {
    sub: userId,
    iat: now,
    exp: now + REFRESH_TOKEN_EXPIRES_IN,
    // note: we use REFRESH_TOKEN_SECRET so refresh tokens can be separately revoked if desired
  };

  const token = await sign(payload, REFRESH_TOKEN_SECRET);
  return { token, expiresIn: REFRESH_TOKEN_EXPIRES_IN };
}

/**
 * Persist refresh token in DB (one token per device)
 * - deviceInfo is optional JSON (platform, deviceId, appVersion)
 */
async function persistRefreshToken(
  userId: string,
  refreshToken: string,
  deviceInfo: any = null,
) {
  // insert a token row
  await db.insert(mobileUserRefreshTokens).values({
    id: createId(),
    userId,
    refreshToken,
    deviceInfo: deviceInfo ? JSON.stringify(deviceInfo) : null,
    createdAt: new Date(),
  });
}

/**
 * Revoke (mark) a refresh token in DB
 */
async function revokeRefreshToken(refreshToken: string) {
  await db
    .update(mobileUserRefreshTokens)
    .set({ revoked: "true" })
    .where(eq(mobileUserRefreshTokens.refreshToken, refreshToken));
}

/**
 * Validate refresh token: check signature + DB not revoked + expiration
 */
async function validateRefreshToken(refreshToken: string) {
  try {
    // verify signature
    const { payload } = await jwtVerify(refreshToken, async (header) => {
      // jose accepts a KeyLike; here we reuse REFRESH_TOKEN_SECRET (symmetric)
      // but jwtVerify expects a KeyLike; for symmetric shared secret we can return Buffer
      return Buffer.from(REFRESH_TOKEN_SECRET, "utf-8");
    });
    const sub = (payload as any).sub;
    // check DB
    const [row] = await db
      .select()
      .from(mobileUserRefreshTokens)
      .where(eq(mobileUserRefreshTokens.refreshToken, refreshToken));

    if (!row || row.revoked) return null;
    return { userId: sub as string, row };
  } catch {
    return null;
  }
}

/* ---------------------
   findOrCreateUser (keeps your logic)
   --------------------- */

async function findOrCreateUser({
  email,
  firstName,
  lastName,
  provider,
  providerId,
  avatar,
}: {
  email: string;
  firstName: string;
  lastName: string;
  provider: "google" | "apple";
  providerId: string;
  avatar?: string | null;
}) {
  let user = await getMobileUserByEmail(email);

  if (!user) {
    const [newUser] = await db
      .insert(mobileUsers)
      .values({
        id: createId(),
        email,
        firstName,
        lastName,
        provider,
        providerId,
        avatar: avatar ?? "",
        createdAt: new Date(),
      })
      .returning();

    return newUser;
  }

  // Link provider id if missing or update provider
  await db
    .update(mobileUsers)
    .set({
      provider,
      providerId,
      firstName,
      lastName,
      avatar: avatar ?? user.avatar,
    })
    .where(eq(mobileUsers.id, user.id));

  // return fresh user record
  const [updated] = await db
    .select()
    .from(mobileUsers)
    .where(eq(mobileUsers.id, user.id));
  return updated;
}

/* ---------------------
   GOOGLE Sign In
   POST /auth/google
   body: { idToken, deviceInfo? }
   --------------------- */

app.post("/auth/google", async (c) => {
  const body = await c.req.json();
  const idToken = body?.idToken;
  const deviceInfo = body?.deviceInfo ?? null;

  if (!idToken) throw new HTTPException(400, { message: "Missing idToken" });

  const ticket = await googleClient.verifyIdToken({
    idToken,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const payload = ticket.getPayload();
  if (!payload || !payload.email)
    throw new HTTPException(401, { message: "Invalid Google token" });

  const { email, name, picture, sub, email_verified } = payload as any;
  if (!email_verified)
    throw new HTTPException(401, { message: "Google email not verified" });

  const { firstName, lastName } = splitFullName(name);

  const user = await findOrCreateUser({
    email,
    firstName,
    lastName,
    provider: "google",
    providerId: sub,
    avatar: picture ?? "",
  });

  // create tokens
  const access = await createAccessToken(user);
  const refresh = await createRefreshToken(user.id);

  // persist refresh token with device info
  await persistRefreshToken(user.id, refresh.token, deviceInfo);

  // response shape matching your docs
  return c.json({
    success: true,
    data: {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        profilePicture: user.avatar || null,
        createdAt: user.createdAt,
        isProfileComplete: Boolean(user.firstName && user.lastName),
      },
      tokens: {
        accessToken: access.token,
        refreshToken: refresh.token,
        expiresIn: access.expiresIn,
      },
    },
  });
});

/* ---------------------
   APPLE Sign In
   POST /auth/apple
   body: { identityToken, authorizationCode, user?, deviceInfo? }
   --------------------- */

app.post("/auth/apple", async (c) => {
  const body = await c.req.json();
  const idToken = body?.identityToken;
  const authorizationCode = body?.authorizationCode;
  const userObj = body?.user ?? null; // { email, firstName, lastName }
  const deviceInfo = body?.deviceInfo ?? null;

  if (!idToken)
    throw new HTTPException(400, { message: "Missing identityToken" });

  try {
    const { payload } = await jwtVerify(idToken, JWKS, {
      issuer: "https://appleid.apple.com",
      audience: process.env.APPLE_CLIENT_ID,
    });

    const email = (payload as any).email;
    const sub = (payload as any).sub;

    if (!email || typeof email !== "string") {
      throw new HTTPException(400, { message: "Missing email in Apple token" });
    }

    // use provided user object when Apple sends name on first sign-in
    const firstName = (userObj?.firstName as string) ?? "";
    const lastName = (userObj?.lastName as string) ?? "";

    const user = await findOrCreateUser({
      email,
      firstName,
      lastName,
      provider: "apple",
      providerId: sub as string,
      avatar: "",
    });

    const access = await createAccessToken(user);
    const refresh = await createRefreshToken(user.id);
    await persistRefreshToken(user.id, refresh.token, deviceInfo);

    return c.json({
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          profilePicture: user.avatar || null,
          createdAt: user.createdAt,
          isProfileComplete: Boolean(user.firstName && user.lastName),
        },
        tokens: {
          accessToken: access.token,
          refreshToken: refresh.token,
          expiresIn: access.expiresIn,
        },
      },
    });
  } catch (err) {
    throw new HTTPException(401, { message: "Invalid Apple token" });
  }
});

/* ---------------------
   Refresh token
   POST /auth/refresh
   body: { refreshToken }
   --------------------- */

app.post("/auth/refresh", async (c) => {
  const { refreshToken } = await c.req.json();

  if (!refreshToken)
    throw new HTTPException(400, { message: "Missing refreshToken" });

  const validated = await validateRefreshToken(refreshToken);
  if (!validated)
    throw new HTTPException(401, {
      message: "Invalid or revoked refresh token",
    });

  // get user
  const [user] = await db
    .select()
    .from(mobileUsers)
    .where(eq(mobileUsers.id, validated.userId));
  if (!user) throw new HTTPException(404, { message: "User not found" });

  // issue new access token (we keep same refresh token unless you want rotate)
  const access = await createAccessToken(user);

  return c.json({
    success: true,
    data: {
      accessToken: access.token,
      expiresIn: access.expiresIn,
    },
  });
});

/* ---------------------
   Sign out
   POST /auth/signout
   Header: Authorization: Bearer <accessToken>
   body: { refreshToken }
   --------------------- */

app.post("/auth/signout", async (c) => {
  const authHeader = c.req.header("authorization") || "";
  const bearer = authHeader.split(" ")[1];

  // we don't necessarily need to validate the access token here; main thing is revoke refresh token
  const { refreshToken } = await c.req.json();

  if (refreshToken) {
    await revokeRefreshToken(refreshToken);
  }

  return c.json({ success: true, message: "Successfully signed out" });
});

export default app;
