"use server";

import { z } from "zod";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { db } from "@/src/db/drizzle";
import { currentUser } from "@/src/lib/auth";
import { users } from "@/src/db/schemas/users";
import { ChangePasswordSchema } from "@/src/schemas/user";
import { getUserByEmailWithPassword } from "@/src/data/user";

export const changePassword = async (
  values: z.infer<typeof ChangePasswordSchema>,
) => {
  try {
    // Validate input
    const validated = ChangePasswordSchema.safeParse(values);
    if (!validated.success) {
      return { error: "Invalid password change data." };
    }

    const { oldPassword, newPassword, confirmPassword } = validated.data;

    if (newPassword !== confirmPassword) {
      return { error: "New password and confirm password do not match." };
    }

    // Check current user
    const authUser = await currentUser();
    if (!authUser) return { error: "Unauthorized" };

    // Fetch user
    const existingUser = await getUserByEmailWithPassword(authUser.email);
    if (!existingUser) return { error: "User does not exist." };

    // Validate old password
    const isOldPasswordCorrect = await bcrypt.compare(
      oldPassword,
      existingUser.password,
    );
    if (!isOldPasswordCorrect) {
      return { error: "Old password is incorrect." };
    }

    // Prevent using same password
    const isSamePassword = await bcrypt.compare(
      newPassword,
      existingUser.password,
    );

    if (isSamePassword) {
      return { error: "New password cannot be the same as the old password." };
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update in DB
    const [result] = await db
      .update(users)
      .set({ password: hashedPassword })
      .where(eq(users.id, existingUser.id))
      .returning();

    return { success: "Password updated successfully.", user: result };
  } catch (error) {
    console.error("Change password error:", error);
    return { error: "Something went wrong while updating your password." };
  }
};
