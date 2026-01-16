import NextAuth from "next-auth";
import { eq } from "drizzle-orm";
import { db } from "@/src/db/drizzle";
import authConfig from "@/auth.config";
import { users } from "@/src/db/schemas/users";
import type { DefaultSession } from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { getUserByIdWithPassword } from "@/src/data/user";
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      avatar: string;
      emailVerified: Date | string | null;
      phoneVerified: boolean;
      platformRole: string;
      defaultBusinessId: string;
      defaultBusinessType: string;
    } & DefaultSession["user"];
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  events: {
    async linkAccount({ user }) {
      await db
        .update(users)
        .set({ emailVerified: new Date() })
        .where(eq(users.id, user.id as string));
    },
  },
  callbacks: {
    async signIn({ user }) {
      // If user.id is missing, reject
      if (!user?.id) return false;

      const existingUser = await getUserByIdWithPassword(user.id);

      // If user was deleted from DB, block sign-in
      return !!existingUser;
    },

    async session({ token, session }) {
      // If user no longer exists, clear session
      if (!token.sub || !token.email) {
        return { ...session, user: undefined };
      }

      if (session.user) {
        session.user.id = token.sub;
        session.user.firstName = token.firstName as string;
        session.user.lastName = token.lastName as string;
        session.user.email = token.email as string;
        session.user.phone = token.phone as string;
        session.user.avatar = token.avatar as string;
        session.user.phoneVerified = token.phoneVerified as boolean;
        session.user.platformRole = token.platformRole as string;
        session.user.defaultBusinessId = token.defaultBusinessId as string;
        session.user.defaultBusinessType = token.defaultBusinessType as string;
        session.user.emailVerified =
          typeof token.emailVerified === "string"
            ? new Date(token.emailVerified)
            : token.emailVerified instanceof Date
            ? token.emailVerified
            : null;
      }

      return session;
    },

    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserByIdWithPassword(token.sub);

      // If user no longer exists in DB → invalidate token
      if (!existingUser) {
        return { ...token, sub: undefined, email: null }; // forces logout
      }

      // Refresh token with latest user data
      token.firstName = existingUser.firstName;
      token.lastName = existingUser.lastName;
      token.email = existingUser.email;
      token.phone = existingUser.phone;
      token.avatar = existingUser.avatar;
      token.emailVerified = existingUser.emailVerified;
      token.phoneVerified = existingUser.phoneVerified;
      token.platformRole = existingUser.platformRole;
      token.defaultBusinessId = existingUser.defaultBusinessId;
      token.defaultBusinessType = existingUser.defaultBusinessType;

      return token;
    },
  },

  adapter: DrizzleAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
