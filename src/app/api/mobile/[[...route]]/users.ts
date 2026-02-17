import { Hono } from "hono";
import { eq } from "drizzle-orm";
import { db } from "@/src/db/drizzle";
import { HTTPException } from "hono/http-exception";
import { mobileUsers } from "@/src/db/schemas/mobile-users";
import { requireAuth } from "@/src/middleware/require-auth";

/* -----------------------------------
   Type-safe JWT Payload
----------------------------------- */
type JwtPayload = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  provider: string;
  iat: number;
  exp: number;
};

type Variables = {
  jwtPayload: JwtPayload;
};

const app = new Hono<{ Variables: Variables }>();

/* -----------------------------------
   Protect all /me routes
----------------------------------- */
app.use("/me/*", requireAuth);

/* -----------------------------------
   GET /users/me
----------------------------------- */
app.get("/me", async (c) => {
  const jwtUser = c.get("jwtPayload");
  const userId = jwtUser.id;

  const [user] = await db
    .select()
    .from(mobileUsers)
    .where(eq(mobileUsers.id, userId));

  if (!user) throw new HTTPException(404, { message: "User not found" });

  return c.json({
    success: true,
    data: {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      gender: user.gender,
      height: user.height,
      waist: user.waist,
      profilePicture: user.avatar || null,
      preferences: {
        unit: user.unit || "inches",
        language: user.language || "en-US",
      },
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      isProfileComplete: Boolean(user.gender && user.height && user.waist),
    },
  });
});

/* -----------------------------------
   PUT /users/me/complete-profile
----------------------------------- */
app.put("/me/complete-profile", async (c) => {
  const jwtUser = c.get("jwtPayload");
  const userId = jwtUser.id;

  const { gender, height, waist } = await c.req.json();

  if (!gender || !height || !waist) {
    throw new HTTPException(400, {
      message: "gender, height and waist are required",
    });
  }

  const [updated] = await db
    .update(mobileUsers)
    .set({
      gender,
      height,
      waist,
      updatedAt: new Date(),
    })
    .where(eq(mobileUsers.id, userId))
    .returning();

  return c.json({
    success: true,
    data: {
      id: updated.id,
      email: updated.email,
      firstName: updated.firstName,
      lastName: updated.lastName,
      gender: updated.gender,
      height: updated.height,
      waist: updated.waist,
      isProfileComplete: true,
      updatedAt: updated.updatedAt,
    },
  });
});

/* -----------------------------------
   PATCH /users/me
----------------------------------- */
app.patch("/me", async (c) => {
  const jwtUser = c.get("jwtPayload");
  const userId = jwtUser.id;

  const body = await c.req.json();

  const updateData: any = {
    updatedAt: new Date(),
  };

  if (body.firstName !== undefined) updateData.firstName = body.firstName;
  if (body.lastName !== undefined) updateData.lastName = body.lastName;
  if (body.height !== undefined) updateData.height = body.height;
  if (body.waist !== undefined) updateData.waist = body.waist;

  const [updated] = await db
    .update(mobileUsers)
    .set(updateData)
    .where(eq(mobileUsers.id, userId))
    .returning();

  return c.json({
    success: true,
    data: {
      id: updated.id,
      email: updated.email,
      firstName: updated.firstName,
      lastName: updated.lastName,
      gender: updated.gender,
      height: updated.height,
      waist: updated.waist,
      updatedAt: updated.updatedAt,
    },
  });
});

/* -----------------------------------
   PATCH /users/me/preferences
----------------------------------- */
app.patch("/me/preferences", async (c) => {
  const jwtUser = c.get("jwtPayload");
  const userId = jwtUser.id;

  const { unit, language } = await c.req.json();

  const [updated] = await db
    .update(mobileUsers)
    .set({
      unit,
      language,
      updatedAt: new Date(),
    })
    .where(eq(mobileUsers.id, userId))
    .returning();

  return c.json({
    success: true,
    data: {
      preferences: {
        unit: updated.unit,
        language: updated.language,
      },
      updatedAt: updated.updatedAt,
    },
  });
});

/* -----------------------------------
   POST /users/me/profile-picture
----------------------------------- */
app.post("/me/profile-picture", async (c) => {
  const jwtUser = c.get("jwtPayload");
  const userId = jwtUser.id;

  const { fileUrl } = await c.req.json();

  if (!fileUrl) {
    throw new HTTPException(400, {
      message: "fileUrl is required",
    });
  }

  const [updated] = await db
    .update(mobileUsers)
    .set({
      avatar: fileUrl,
      updatedAt: new Date(),
    })
    .where(eq(mobileUsers.id, userId))
    .returning();

  return c.json({
    success: true,
    data: {
      profilePicture: updated.avatar,
      updatedAt: updated.updatedAt,
    },
  });
});

export default app;
