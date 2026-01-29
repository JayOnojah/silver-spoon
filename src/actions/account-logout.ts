"use server";

import { signOut } from "@/auth";
import { cookies } from "next/headers";

export const accountLogout = async () => {
  try {
    const cookieStore = await cookies();

    // Delete cookies safely
    [
      "tenant_id",
      "authjs.session-token",
      "__Secure-authjs.session-token",
    ].forEach((name) => cookieStore.delete({ name, path: "/" }));

    // Wait briefly to ensure deletion
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Redirect to login
    await signOut({
      redirect: true,
      redirectTo: "/login",
    });
  } catch (error: any) {
    // Ignore the NEXT_REDIRECT error thrown by Next.js
    if (error?.digest?.startsWith("NEXT_REDIRECT")) return;

    console.error("Logout error: ", error);

    // Fallback redirect in case of a real error
    await signOut({
      redirect: true,
      redirectTo: "/login",
    });
  }
};
