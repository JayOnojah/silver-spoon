"use server";

import { and, eq } from "drizzle-orm";
import { db } from "@/src/db/drizzle";
import { users } from "@/src/db/schemas/users";
import { User } from "@/src/resources/user";

export const getUserByEmail = async (email: string) => {
  if (!email) return null;

  try {
    const [user] = await db.select().from(users).where(eq(users.email, email));

    if (!user) return null;

    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      emailVerified: user.emailVerified,
      phoneVerified: user.phoneVerified,
      avatar: user.avatar,
      platformRole: user.platformRole,
      defaultBusinessId: user.defaultBusinessId,
      defaultBusinessType: user.defaultBusinessType,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  } catch (error) {
    console.error("Error fetching user by email:", error);
    return null;
  }
};

export const getUserByEmailWithPassword = async (email: string) => {
  if (!email) return null;

  try {
    const [user] = await db.select().from(users).where(eq(users.email, email));

    if (!user) return null;

    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      password: user.password,
      emailVerified: user.emailVerified,
      phoneVerified: user.phoneVerified,
      avatar: user.avatar,
      platformRole: user.platformRole,
      defaultBusinessId: user.defaultBusinessId,
      defaultBusinessType: user.defaultBusinessType,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  } catch (error) {
    console.error("Error fetching user by email with password:", error);
    return null;
  }
};

export const getUserById = async (id: string) => {
  if (!id) return null;

  try {
    const [user] = await db.select().from(users).where(eq(users.id, id));

    if (!user) return null;

    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      emailVerified: user.emailVerified,
      phoneVerified: user.phoneVerified,
      avatar: user.avatar,
      platformRole: user.platformRole,
      defaultBusinessId: user.defaultBusinessId,
      defaultBusinessType: user.defaultBusinessType,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  } catch (error) {
    console.error("Error fetching user by id:", error);
    return null;
  }
};

export const getUserByIdWithPassword = async (id: string) => {
  if (!id) return null;

  try {
    const [user] = await db.select().from(users).where(eq(users.id, id));

    if (!user) return null;

    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      password: user.password,
      emailVerified: user.emailVerified,
      phoneVerified: user.phoneVerified,
      avatar: user.avatar,
      platformRole: user.platformRole,
      defaultBusinessId: user.defaultBusinessId,
      defaultBusinessType: user.defaultBusinessType,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  } catch (error) {
    console.error("Error fetching user by id with password:", error);
    return null;
  }
};

export const getUserByProvider = async (
  provider: string,
  providerId: string,
) => {
  if (!provider || !providerId) return null;

  try {
    const [user] = await db
      .select()
      .from(users)
      .where(
        and(eq(users.provider, "google"), eq(users.providerId, providerId)),
      );

    if (!user) return null;

    return User.parse(user);
  } catch (error) {
    console.error("Error fetching user by provider ID:", error);
    return null;
  }
};
