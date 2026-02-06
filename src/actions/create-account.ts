"use server";

import { z } from "zod";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { db } from "@/src/db/drizzle";
import { cookies } from "next/headers";
import { users } from "@/src/db/schemas/users";
import { createId } from "@paralleldrive/cuid2";
import { getUserByEmail } from "@/src/data/user";
import { SignUpSchema } from "@/src/schemas/user";
import { sendVerificationEmail } from "@/lib/mail";
import { websites } from "@/src/db/schemas/websites";
import { businesses } from "@/src/db/schemas/businesses";
import { generateVerificationToken } from "@/lib/tokens";
import { businessUsers } from "@/src/db/schemas/business-users";

const isProd = process.env.NODE_ENV === "production";

export const createAccount = async (values: z.infer<typeof SignUpSchema>) => {
  const validatedFields = SignUpSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid sign-up data. Please check your inputs." };
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

  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return { error: "User with this email already exists." };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  // 1. Create user (emailVerified stays null)
  const [newUser] = await db
    .insert(users)
    .values({
      id: createId(),
      firstName,
      lastName,
      email: email.toLowerCase(),
      phone,
      password: hashedPassword,
      platformRole: "owner",
      // IMPORTANT: do NOT set emailVerified here
    })
    .returning({ id: users.id });

  if (!newUser?.id) {
    return { error: "Failed to create user account." };
  }

  const userId = newUser.id;

  // 2. Create business
  const [newBusiness] = await db
    .insert(businesses)
    .values({
      id: createId(),
      userId,
      name: businessName,
      businessType: businessType as "tailor" | "cobbler" | "others",
    })
    .returning({ id: businesses.id });

  const businessId = newBusiness?.id;
  if (!businessId) {
    return { error: "Failed to create business." };
  }

  // 3. Create default website
  await db.insert(websites).values({
    id: createId(),
    businessId,
    name: `https://${businessName.toLowerCase().replace(/\s+/g, "-")}.usesilverspoon.com`,
  });

  // 4. Set default business on user
  await db
    .update(users)
    .set({
      defaultBusinessId: businessId,
      defaultBusinessType: businessType,
    })
    .where(eq(users.id, userId));

  // 5. Link user to business as admin
  await db.insert(businessUsers).values({
    userId,
    businessId,
    role: "admin",
  });

  // 6. Generate & send verification code
  const verificationCode = await generateVerificationToken(email, userId);
  await sendVerificationEmail(email, verificationCode.token, firstName);

  // 7. Set business_id cookie (useful for future logins too)
  if (businessId) {
    const cookieStore = await cookies();
    cookieStore.set("business_id", businessId, {
      path: "/",
      httpOnly: false,
      secure: isProd,
      sameSite: "lax",
      domain: isProd ? ".usesilverspoon.com" : undefined,
      maxAge: 60 * 60 * 24 * 365,
    });
  }

  return { success: true };
};
