import { eq } from "drizzle-orm";
import { db } from "@/src/db/drizzle";
import { passwordResetTokens } from "@/src/db/schemas/tokens";
import { verificationTokens } from "@/src/db/schemas/tokens";

export const getPasswordResetTokenByToken = async (token: string) => {
  try {
    const [verificationToken] = await db
      .select()
      .from(passwordResetTokens)
      .where(eq(passwordResetTokens.token, token));

    return verificationToken;
  } catch {
    return null;
  }
};

export const getPasswordResetTokenByEmail = async (email: string) => {
  try {
    const [verificationToken] = await db
      .select()
      .from(passwordResetTokens)
      .where(eq(passwordResetTokens.email, email));

    return verificationToken;
  } catch {
    return null;
  }
};

export const getVerificationTokenByToken = async (token: string) => {
  try {
    const [verificationToken] = await db
      .select()
      .from(verificationTokens)
      .where(eq(verificationTokens.token, token));

    return verificationToken;
  } catch {
    return null;
  }
};

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const [verificationToken] = await db
      .select()
      .from(verificationTokens)
      .where(eq(verificationTokens.email, email));

    return verificationToken;
  } catch {
    return null;
  }
};
