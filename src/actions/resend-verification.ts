"use server";

import { eq } from "drizzle-orm";
import { db } from "@/src/db/drizzle";
import { getUserByEmail } from "@/src/data/user";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/tokens";
import { verificationTokens } from "@/src/db/schemas/tokens";
import { getVerificationTokenByEmail } from "@/src/data/tokens";

export const resendVerification = async (email: string) => {
  try {
    if (!email) return { error: "Email is required." };

    const existingUser = await getUserByEmail(email);
    if (!existingUser) return { error: "User with this email was not found" };

    const existingToken = await getVerificationTokenByEmail(email);
    if (existingToken) {
      await db
        .delete(verificationTokens)
        .where(eq(verificationTokens.email, existingToken.email));
    }

    const verificationCode = await generateVerificationToken(
      email,
      existingUser.id,
    );

    await sendVerificationEmail(
      email,
      verificationCode.token,
      existingUser.firstName,
    );

    return { success: "A new verification code has been sent to your email." };
  } catch (e) {
    return { error: "Unable to resend verification at the moment. Try again." };
  }
};
