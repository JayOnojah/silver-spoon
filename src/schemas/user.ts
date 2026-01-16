import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "The email address field is required",
  }),
  password: z.string().min(1, {
    message: "The password field is required",
  }),
});

export const VerificationCodeSchema = z.object({
  code: z
    .string()
    .min(6, { message: "A minimum of 6 digits for OTP" })
    .max(6, { message: "A maximum of 6 digits for OTP" }),
});

export const ForgotPasswordSchema = z.object({
  email: z.string().email({
    message: "The email address field is required",
  }),
});

export const ResetPasswordSchema = z.object({
  password: z.string().min(8, "password must be at least 8 character"),
});

export const ChangePasswordSchema = z
  .object({
    oldPassword: z.string().min(1, "Old password is required"),
    newPassword: z.string().min(6, "New password must be at least 6 character"),
    confirmPassword: z.string().min(6, "Confirm your new password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const SignUpSchema = z.object({
  firstName: z.string().min(2).max(100).trim().min(2, {
    message: "The first name field is required",
  }),
  lastName: z.string().min(2).max(100).trim().min(2, {
    message: "The last name field is required",
  }),
  businessName: z.string().min(2).max(100).trim().min(2, {
    message: "The business name field is required",
  }),
  businessType: z.string().min(1, {
    message: "The business type field is required",
  }),
  email: z.string().email({
    message: "The email address field is required",
  }),
  phone: z.string().min(10, {
    message: "The phone number field is required",
  }),
  password: z.string().min(6, {
    message: "A minimum of 6 characters is required",
  }),
  agreeToTerms: z.boolean().refine((val) => val, {
    message: "You must agree to the terms and conditions",
  }),
});
