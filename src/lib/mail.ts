import { Resend } from "resend";
import { VerifyEmail } from "@/src/components/emails/verify-email";
import { SetPassword } from "@/src/components/emails/set-password";
import { ResetPassword } from "@/src/components/emails/reset-password";

const sender = "KeepOS <no-reply@mail.keep-os.com>";
const resend = new Resend(process.env.RESEND_API_KEY);
const domain = process.env.NEXT_PUBLIC_RESEND_DOMAIN || "keep-os.com";

export const sendVerificationEmail = async (
  email: string,
  token: string,
  name: string,
) => {
  const { data, error } = await resend.emails.send({
    from: sender,
    to: email,
    subject: "Verify Your Email Address",
    react: VerifyEmail({
      name,
      code: token,
    }),
  });

  if (error) {
    throw new Error(`Failed to send verification email: ${error.message}`);
  }

  console.log("Verification email sent successfully:", data);
};

export const sendPasswordResetEmail = async (
  email: string,
  token: string,
  name: string,
) => {
  const resetLink = `https://${domain}/auth/reset-password?token=${token}`;
  const { data, error } = await resend.emails.send({
    from: sender,
    to: email,
    subject: "Reset Your Account Password",
    react: ResetPassword({
      name,
      resetLink: resetLink,
    }),
  });

  if (error) {
    throw new Error(`Failed to send password reset email: ${error.message}`);
  }

  console.log("Password reset email sent successfully:", data);
};

export const sendSetPasswordEmail = async (
  email: string,
  token: string,
  name: string,
  business: string,
  position: string,
) => {
  console.log("\n--- sendSetPasswordEmail function called ---");
  console.log("Parameters:", {
    email,
    token: token.substring(0, 10) + "...",
    name,
    business,
    position,
  });

  const resetLink = `https://${domain}/auth/reset-password?token=${token}`;
  console.log("Reset link:", resetLink);
  console.log("Sender:", sender);
  console.log("Calling resend.emails.send...");

  const { data, error } = await resend.emails.send({
    from: sender,
    to: email,
    subject: "Reset Your Account Password",
    react: SetPassword({
      name,
      business,
      position,
      resetLink: resetLink,
    }),
  });

  if (error) {
    console.error("❌ Resend API error:", error);
    throw new Error(`Failed to send password reset email: ${error.message}`);
  }

  console.log("✓ Password reset email sent successfully!");
  console.log("Resend response data:", data);
  console.log("--- sendSetPasswordEmail completed ---\n");
};
