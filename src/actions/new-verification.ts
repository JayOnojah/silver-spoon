"use server";

import { eq } from "drizzle-orm";
import { db } from "@/src/db/drizzle";
import { users } from "@/src/db/schemas/users";
import { getUserByEmail } from "@/src/data/user";
import { verificationTokens } from "@/src/db/schemas/tokens";
import { getVerificationTokenByEmail } from "@/src/data/tokens";

/**
 * Verifies a user's email using a 6-digit code.
 * @param email user's email
 * @param code 6-digit OTP entered by the user
 */
export const newVerification = async (email: string, code: string) => {
  const trimmedCode = (code ?? "").trim();

  if (!email) {
    return { error: "Email is required." };
  }
  if (!/^\d{6}$/.test(trimmedCode)) {
    return { error: "Invalid verification code format." };
  }

  const existingToken = await getVerificationTokenByEmail(email);

  if (!existingToken) {
    return { error: "Your verification token does not exist." };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) {
    return { error: "Your verification token has expired." };
  }

  if (existingToken.token !== trimmedCode) {
    return { error: "Invalid verification code." };
  }

  const existingUser = await getUserByEmail(existingToken.email);
  if (!existingUser) {
    return { error: "Email for this request does not exist." };
  }

  await db
    .update(users)
    .set({ emailVerified: new Date() })
    .where(eq(users.email, existingToken.email));

  await db
    .delete(verificationTokens)
    .where(eq(verificationTokens.email, existingToken.email));

  return { success: "Your email was verified successfully." };
};
