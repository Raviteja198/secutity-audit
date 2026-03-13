import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

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
      async authorize(credentials) {
        try {
          console.log("CREDENTIALS:", credentials);
      
          if (!credentials) return null;
      
          const parsed = credentialsSchema.safeParse({
            email: credentials.email,
            password: credentials.password,
          });
      
          console.log("PARSED:", parsed);
      
          if (!parsed.success) return null;
      
          const { email, password } = parsed.data;
      
          const user = await prisma.user.findUnique({
            where: {
              email: email.toLowerCase(),
            },
          });
      
          console.log("USER FROM DB:", user);
      
          if (!user || !user.isActive) return null;
      
          const isValid = await bcrypt.compare(password, user.passwordHash);
      
          console.log("PASSWORD MATCH:", isValid);
      
          if (!isValid) return null;
      
          return {
            id: user.id,
            email: user.email,
            role: user.role,
          };
        } catch (err) {
          console.error("AUTH ERROR:", err);
          return null;
        }
      }
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.sub = (user as { id?: string }).id ?? token.sub;
        token.role = (user as { role?: "ADMIN" | "USER" }).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.sub) {
        (session.user as unknown as { id: string }).id = token.sub;
        (session.user as unknown as { role?: "ADMIN" | "USER" }).role = (token as { role?: "ADMIN" | "USER" }).role;
      }
      return session;
    },
  },
};

