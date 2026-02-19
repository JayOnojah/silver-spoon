"use server";

import { createId } from "@paralleldrive/cuid2";
import { getUserByProvider } from "@/src/data/user";
import { db } from "@/src/db/drizzle";
import { users } from "@/src/db/schemas/users";
import { GoogleOAuthSignUpSchema } from "@/src/schemas/user";

export const createAccountGoogle = async (values: {
  firstName: string | null | undefined;
  lastName: string | null | undefined;
  provider: string;
  providerId: string;
  id: string;
  avatar: string | null;
  platformRole: string;
  email: string;
}) => {
  const validatedFields = GoogleOAuthSignUpSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid sign-up data. Please check your inputs." };
  }

  const { firstName, lastName, email, providerId, avatar } =
    validatedFields.data;

  const existingUser = await getUserByProvider("google", providerId);
  if (existingUser) {
    return { success: true };
  }

  const [newUser] = await db
    .insert(users)
    .values({
      id: createId(),
      firstName: firstName,
      lastName: lastName,
      email: email,
      provider: "google",
      providerId: providerId,
      avatar: avatar,
      platformRole: "owner",
    })
    .returning({ id: users.id });

  if (!newUser?.id) {
    return { error: "Failed to create user account." };
  }

  return { success: true };
};
