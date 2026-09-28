import 'dotenv/config'
import { defineConfig } from 'prisma/config'

if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL =
    'postgresql://placeholder:placeholder@localhost:5432/placeholder'

  console.warn(
    '[Prisma] DATABASE_URL is not set during build. Using a placeholder URL for prisma generate.'
  )
}

if (!process.env.DIRECT_DATABASE_URL) {
  process.env.DIRECT_DATABASE_URL = process.env.DATABASE_URL
}

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
})
