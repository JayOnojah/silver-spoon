"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { db } from "@/src/db/drizzle";
import { users } from "@/src/db/schemas/users";
import { getUserByEmail } from "@/src/data/user";
import { ResetPasswordSchema } from "@/src/schemas/user";
import { passwordResetTokens } from "@/src/db/schemas/tokens";
import { getPasswordResetTokenByToken } from "@/src/data/tokens";

type Result = { success?: string; error?: string };

export const resetPassword = async (
  values: z.infer<typeof ResetPasswordSchema>,
  token?: string | null,
): Promise<Result> => {
  try {
    if (!token) {
      return { error: "Token not found for making this request." };
    }

    const parsed = ResetPasswordSchema.safeParse(values);
    if (!parsed.success) {
      return { error: "You have provided invalid credentials." };
    }

    const { password } = parsed.data;
    const existingToken = await getPasswordResetTokenByToken(token);

    if (!existingToken) {
      return { error: "Your current request token is expired or invalid." };
    }

    const hasExpired = new Date(existingToken.expires) < new Date();

    if (hasExpired) {
      // optionally delete expired token here (or let a cleanup cron handle it)
      try {
        await db
          .delete(passwordResetTokens)
          .where(eq(passwordResetTokens.id, existingToken.id));
      } catch (delErr) {
        console.warn("Failed to delete expired token:", delErr);
      }
      return { error: "Your current request token is expired." };
    }

    const existingUser = await getUserByEmail(existingToken.email);

    if (!existingUser) {
      return { error: "Email for this request does not exist." };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Update password and verify email (for new staff members setting password for first time)
    await db
      .update(users)
      .set({
        password: hashedPassword,
        emailVerified: new Date(), // Mark email as verified when password is set
      })
      .where(eq(users.id, existingUser.id))
      .returning();

    // delete the used token
    await db
      .delete(passwordResetTokens)
      .where(eq(passwordResetTokens.id, existingToken.id));

    return {
      success: "You have successfully reset your password. Proceed to login.",
    };
  } catch (err) {
    console.error("resetPassword (server) error:", err);
    return {
      error: "Unable to process request at this time. Please try again later.",
    };
  }
};
