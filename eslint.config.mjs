import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Generated Prisma client (not hand-edited)
    "src/generated/**",
  ]),
  {
    // Multi-tenancy enforcement: every route/service must go through
    // forTenant() from @/lib/tenantPrisma instead of the raw, unscoped
    // Prisma client, so a tenantId filter can never be silently forgotten.
    files: ["src/**/*.{ts,tsx}"],
    ignores: [
      "src/lib/prisma.ts",
      "src/lib/tenantPrisma.ts",
      "src/lib/auth.ts",
      "src/lib/scheduledReminders.ts",
      // Pre-auth routes: look up User by email before any tenant is known,
      // same reason as src/lib/auth.ts above.
      "src/app/api/auth/forgot-password/route.ts",
      "src/app/api/auth/reset-password/route.ts",
      // Creates the tenant itself — no tenantId exists yet to scope through.
      "src/app/api/system/onboard-tenant/create/route.ts",
    ],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "@/lib/prisma",
              message: "Import forTenant() from @/lib/tenantPrisma instead of the raw, unscoped Prisma client.",
            },
          ],
        },
      ],
    },
  },
]);

export default eslintConfig;
