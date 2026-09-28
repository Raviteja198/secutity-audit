import type { NextAuthOptions } from "next-auth";
import type { Prisma } from "@prisma/client";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { clearLoginAttempts, consumeLoginAttempt, getClientIp, loginRateLimitKey } from "@/lib/authSecurity";
// Auth runs before a tenant is known (looking up a user by email across all
// tenants), so it's one of the few legitimate direct users of the raw client.
import { rawPrisma as prisma } from "@/lib/prisma";

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

// Used when no account can be selected so failed sign-ins do not have a
// noticeably cheaper password-verification path than real accounts.
const dummyPasswordHash = "$2a$12$C6UzMDM.H6dfI/f/IKcEeOQhYQhYQhYQhYQhYQhYQhYQhYQhYQhYu";

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, request) {
        try {
          if (!credentials) {
            return null;
          }

          const parsed = credentialsSchema.safeParse({
            email: credentials.email,
            password: credentials.password,
          });

          if (!parsed.success) {
            return null;
          }

          const { email, password } = parsed.data;
          const normalizedEmail = email.toLowerCase();
          const key = loginRateLimitKey(getClientIp(request?.headers), normalizedEmail);

          if (!consumeLoginAttempt(key).allowed) {
            return null;
          }

          // The schema permits the same email in different tenants. The sign-in
          // form has no tenant selector, so accepting an arbitrary findFirst would
          // create an account-selection vulnerability. Refuse ambiguous accounts
          // until the product provides an explicit tenant-login flow.
          const matchingUsers = await prisma.user.findMany({
            where: {
              email: normalizedEmail,
            },
            take: 2,
          });

          const user = matchingUsers.length === 1 ? matchingUsers[0] : null;
          if (!user || !user.isActive) {
            await bcrypt.compare(password, dummyPasswordHash);
            return null;
          }

          const isValid = await bcrypt.compare(password, user.passwordHash);
          if (!isValid) {
            return null;
          }

          clearLoginAttempts(key);

          // lastLoginAt lives on User for member-linked accounts; skip when there is no Member
          // (e.g. admin-only users) so login still succeeds.
          if (user.memberId) {
            const now = new Date();
            // Prisma XOR + some TS/IDE setups mis-resolve `data`; cast matches schema `User.lastLoginAt`.
            await prisma.user.update({
              where: { id: user.id },
              data: { lastLoginAt: now } as Prisma.UserUncheckedUpdateInput,
            });
          }

          return {
            id: user.id,
            email: user.email,
            role: user.role,
            tenantId: user.tenantId,
          };
        } catch (err) {
          // The caller receives the same generic authentication result for every
          // failure, preventing account/tenant enumeration through error details.
          console.error("Credential authentication failed");
          return null;
        }
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      // Google sign-in is restricted to accounts an admin already created (seed admin,
      // or a member the admin invited via OTP) — no self-service sign-up through Google.
      if (account?.provider === "google") {
        const email = user.email?.toLowerCase();
        if (!email) return false;

        const matchingUsers = await prisma.user.findMany({ where: { email }, take: 2 });
        const dbUser = matchingUsers.length === 1 ? matchingUsers[0] : null;
        if (!dbUser || !dbUser.isActive) {
          return false;
        }

        // Overwrite the OAuth profile's synthetic id/role with our real DB user so the
        // jwt callback below (which reads user.id / user.role) links to the right account.
        user.id = dbUser.id;
        (user as { role?: "ADMIN" | "USER" }).role = dbUser.role;
        (user as { tenantId?: string }).tenantId = dbUser.tenantId;

        if (dbUser.memberId) {
          await prisma.user.update({
            where: { id: dbUser.id },
            data: { lastLoginAt: new Date() } as Prisma.UserUncheckedUpdateInput,
          });
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      // When user logs in, add id and role to token
      if (user) {
        const userId = (user as { id?: string }).id;
        const userRole = (user as { role?: "ADMIN" | "USER" }).role;
        const userTenantId = (user as { tenantId?: string }).tenantId;

        if (userId) {
          token.sub = userId;
        }
        if (userRole) {
          token.role = userRole;
        }
        if (userTenantId) {
          (token as { tenantId?: string }).tenantId = userTenantId;
        }
      }
      // Ensure token always has a role (default to USER if not set)
      if (!token.role) {
        token.role = "USER";
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user && token.sub) {
        (session.user as unknown as { id: string }).id = token.sub;
        (session.user as unknown as { role?: "ADMIN" | "USER" }).role = (token as { role?: "ADMIN" | "USER" }).role ?? "USER";
        (session.user as unknown as { tenantId?: string }).tenantId = (token as { tenantId?: string }).tenantId;
      }
      return session;
    },
  },
};
