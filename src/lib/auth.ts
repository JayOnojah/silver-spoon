import { auth } from "@/auth";

export const currentUser = async () => {
  try {
    const session = await auth();
    return session?.user || null;
  } catch (error) {
    console.error("Error fetching current user:", error);
    return null;
  }
};
