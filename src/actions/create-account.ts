"use server";

import { z } from "zod";
import bcrypt from "bcryptjs";
import { signIn } from "@/auth";
import { eq } from "drizzle-orm";
import { db } from "@/src/db/drizzle";
import { AuthError } from "next-auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SignUpSchema } from "@/src/schemas/user";
import { users } from "@/src/db/schemas/users";
import { createId } from "@paralleldrive/cuid2";
import { getUserByEmail } from "@/src/data/user";
import { businesses } from "@/src/db/schemas/businesses";
import { sendVerificationEmail } from "@/lib/mail";
import { websites } from "@/src/db/schemas/websites";
import { generateVerificationToken } from "@/lib/tokens";
import { businessUsers } from "@/src/db/schemas/business-users";

const isProd = process.env.NODE_ENV === "production";

export const createAccount = async (values: z.infer<typeof SignUpSchema>) => {
  const validatedFields = SignUpSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "You have provied invalid sign-up data." };
  }

  const {
    firstName,
    lastName,
    email,
    phone,
    businessName,
    businessType,
    password,
  } = validatedFields.data;

  const hashedPassword = await bcrypt.hash(password, 10);
  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "User with this email already exists" };
  }

  const [userInsertResult] = await db
    .insert(users)
    .values({
      id: createId(),
      firstName,
      lastName,
      email: email.toLowerCase(),
      phone,
      password: hashedPassword,
      platformRole: "owner",
    })
    .returning();

  const userId = userInsertResult && userInsertResult?.id;

  if (!userId) {
    return { error: "Failed to create user. Please try again." };
  }

  const [businessInsertResult] = await db
    .insert(businesses)
    .values({
      id: createId(),
      userId: userId,
      name: businessName,
      businessType: businessType as "tailor" | "cobbler" | "others",
    })
    .returning();

  const businessId = businessInsertResult && businessInsertResult?.id;
  if (!businessId) {
    return { error: "Failed to create business. Please try again." };
  }

  const [websiteInsertResult] = await db
    .insert(websites)
    .values({
      id: createId(),
      tenantId: businessId,
      name: `https://${businessName.toLowerCase().replace(/\s+/g, "-")}.keep-os.com`,
    })
    .returning();

  const websiteId = websiteInsertResult && websiteInsertResult?.id;

  if (!websiteId) {
    return { error: "Failed to create website. Please try again." };
  }

  const [user] = await db
    .update(users)
    .set({
      defaultBusinessId: businessId,
      defaultBusinessType: businessType,
    })
    .where(eq(users.id, userId))
    .returning();

  if (!user) {
    return { error: "Failed to create user account. Please try again." };
  }

  await db
    .insert(businessUsers)
    .values({
      userId: user.id,
      businessId: businessId,
      role: "admin",
    })
    .returning();

  const verificationCode = await generateVerificationToken(email, userId);
  await sendVerificationEmail(email, verificationCode.token, firstName);

  if (businessId) {
    const cookieStore = await cookies();
    cookieStore.set("business_id", user.defaultBusinessId ?? "", {
      path: "/",
      httpOnly: false, // Allow client-side access if needed
      secure: isProd,
      sameSite: "lax",
      domain: isProd ? ".keep-os.com" : undefined,
      maxAge: 60 * 60 * 24 * 365,
    });
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (businessType === "hotel") {
      redirect("/dashboard/hotel");
    }
    redirect("/dashboard/restaurant");
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "You have provided invalid credentials." };
        default:
          return { error: "Something went wrong. Please try again." };
      }
    }

    throw error;
  }
};
