"use server";

import * as z from "zod";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { cookies } from "next/headers";
import { LoginSchema } from "@/src/schemas/user";

import { getUserByEmailWithPassword } from "@/src/data/user";

const isProd = process.env.NODE_ENV === "production";

export async function accountLogin(
  values: z.infer<typeof LoginSchema>,
  callbackUrl?: string | null,
) {
  const parsed = LoginSchema.safeParse(values);
  if (!parsed.success) {
    return { error: "Check your submissions for invalid inputs." };
  }

  const { email, password } = parsed.data;

  const existingUser = await getUserByEmailWithPassword(email);
  if (!existingUser?.email || !existingUser.password) {
    return { error: "You have provided invalid credentials." };
  }

  const userBusinessType = existingUser.defaultBusinessType;
  const businessId = existingUser.defaultBusinessId;

  // Set tenant cookie if exists
  if (businessId) {
    const jar = await cookies();
    jar.set("business_id", businessId, {
      path: "/",
      httpOnly: false,
      secure: isProd,
      sameSite: "lax",
      domain: isProd ? ".usesilverspoon.com" : undefined,
      maxAge: 60 * 60 * 24 * 365,
    });
  }

  const target =
    callbackUrl ??
    (userBusinessType === "cobblers" ? "/dashboard" : "/dashboard");

  try {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false, // Important: let client handle redirect
    });

    if (result?.error) {
      return { error: "Invalid email address or password." };
    }

    // Success! Return the URL for client-side navigation
    return {
      success: true,
      redirectTo: target,
    };
  } catch (error: any) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid email address or password." };
        default:
          return { error: "Something went wrong. Please try again." };
      }
    }

    throw error;
  }
}
