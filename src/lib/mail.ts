import { Resend } from "resend";
import { v4 as uuidv4 } from "uuid";
import { VerifyEmail } from "@/src/components/emails/verify-email";
import { SetPassword } from "@/src/components/emails/set-password";
import { ResetPassword } from "@/src/components/emails/reset-password";

const generateUniqueRefId = () => uuidv4();
const resend = new Resend(process.env.RESEND_API_KEY);
const sender = "SilverSpoon <no-reply@mail.usesilverspoon.com>";
const domain = process.env.NEXT_PUBLIC_RESEND_DOMAIN || "usesilverspoon.com";

export const sendVerificationEmail = async (
  email: string,
  token: string,
  name: string,
) => {
  const uniqueRef = generateUniqueRefId();

  const { data, error } = await resend.emails.send({
    from: sender,
    to: email,
    subject: "Verify Your Email Address",
    react: VerifyEmail({
      name,
      code: token,
    }),
    headers: {
      "X-Entity-Ref-ID": uniqueRef,
    },
  });

  if (error) {
    throw new Error(`Failed to send verification email: ${error.message}`);
  }

  console.log("Verification email sent successfully: ", data);
};

export const sendPasswordResetEmail = async (
  email: string,
  token: string,
  name: string,
) => {
  const uniqueRef = generateUniqueRefId();
  const resetLink = `https://${domain}/reset-password?token=${token}`;
  const { data, error } = await resend.emails.send({
    from: sender,
    to: email,
    subject: "Reset Your Account Password",
    react: ResetPassword({
      name,
      resetLink: resetLink,
    }),
    headers: {
      "X-Entity-Ref-ID": uniqueRef,
    },
  });

  if (error) {
    throw new Error(`Failed to send password reset email: ${error.message}`);
  }

  console.log("Password reset email sent successfully: ", data);
};

export const sendSetPasswordEmail = async (
  email: string,
  token: string,
  name: string,
  business: string,
  position: string,
) => {
  const uniqueRef = generateUniqueRefId();
  const resetLink = `https://${domain}/reset-password?token=${token}`;

  const { data, error } = await resend.emails.send({
    from: sender,
    to: email,
    subject: "Set Your Account Password",
    react: SetPassword({
      name,
      business,
      position,
      resetLink: resetLink,
    }),
    headers: {
      "X-Entity-Ref-ID": uniqueRef,
    },
  });

  if (error) {
    throw new Error(`Failed to send password reset email: ${error.message}`);
  }

  console.log("Set password email sent successfully: ", data);
};
