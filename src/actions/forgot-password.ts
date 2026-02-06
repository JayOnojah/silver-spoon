"use server";

import * as z from "zod";
import { getUserByEmail } from "@/src/data/user";
import { sendPasswordResetEmail } from "@/src/lib/mail";
import { ForgotPasswordSchema } from "@/src/schemas/user";
import { generatePasswordResetToken } from "@/src/lib/tokens";

type Result = { success?: string; error?: string };

export const forgotPassword = async (
  values: z.infer<typeof ForgotPasswordSchema>,
): Promise<Result> => {
  try {
    const parsed = ForgotPasswordSchema.safeParse(values);

    if (!parsed.success) {
      return { error: "You have provided invalid credentials." };
    }

    const { email } = parsed.data;

    const existingUser = await getUserByEmail(email);

    // Always respond with a neutral success message regardless of whether the
    // email exists in the system (prevents user enumeration)
    const genericSuccessMessage =
      "If an account exists with this email address, a password reset link will be sent to your email address.";

    if (!existingUser || !existingUser.email) {
      return { success: genericSuccessMessage };
    }

    // generate token and send email
    const passwordResetToken = await generatePasswordResetToken(
      email,
      existingUser.id,
      existingUser.firstName,
    );

    await sendPasswordResetEmail(
      passwordResetToken.email,
      passwordResetToken.token,
      passwordResetToken.name,
    );

    return { success: genericSuccessMessage };
  } catch (err) {
    console.error("forgotPassword error:", err);
    return {
      error: "Unable to process request at this time. Please try again later.",
    };
  }
};
