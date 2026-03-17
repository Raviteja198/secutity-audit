/**
 * Prisma configuration validation and setup
 * Ensures required environment variables are configured
 */
import 'dotenv/config'
import { getDeploymentEnv, getEnvConfig } from './src/lib/env'

/**
 * Validate that required environment variables are set
 */
export function validatePrismaConfig() {
  const databaseUrl = process.env.DATABASE_URL

  if (!databaseUrl) {
    throw new Error(
      'DATABASE_URL environment variable is not set. Please configure it in your .env file.'
    )
  }

  const envConfig = getEnvConfig()

  console.log(
    `[Prisma] Initialized with environment: ${envConfig.env}`,
    `(Debug: ${envConfig.debug})`
  )

  return {
    databaseUrl,
    schema: 'prisma/schema.prisma',
    migrations: 'prisma/migrations',
    ...envConfig,
  }
}

// Validate on module load
if (typeof window === 'undefined') {
  validatePrismaConfig()
}

export default validatePrismaConfig()
