import {
  passwordResetTokens,
  emailVerificationTokens,
} from "@/src/db/schemas/tokens";

import { eq } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";
import { db } from "@/src/db/drizzle";
import { generateOTP } from "@/src/lib/utils";
import { createId } from "@paralleldrive/cuid2";
import { getVerificationTokenByEmail } from "@/src/data/tokens";
import { getPasswordResetTokenByEmail } from "@/src/data/tokens";

export const generateVerificationToken = async (
  email: string,
  userId?: string,
) => {
  const token = generateOTP();
  const expires = new Date(new Date().getTime() + 3600 * 1000);
  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await db
      .delete(emailVerificationTokens)
      .where(eq(emailVerificationTokens.email, email));
  }

  const [verificationData] = await db
    .insert(emailVerificationTokens)
    .values({
      id: createId(),
      email,
      token,
      expires,
      userId,
    })
    .returning();

  return verificationData;
};

export const generatePasswordResetToken = async (
  email: string,
  userId: string,
  firstName: string,
) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);
  const existingToken = await getPasswordResetTokenByEmail(email);

  if (existingToken) {
    await db
      .delete(passwordResetTokens)
      .where(eq(passwordResetTokens.email, email));
  }

  const [passwordResetData] = await db
    .insert(passwordResetTokens)
    .values({
      id: createId(),
      email,
      token,
      expires,
      userId,
    })
    .returning();

  return { name: firstName, ...passwordResetData };
};
