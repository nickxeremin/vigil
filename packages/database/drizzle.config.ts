import * as dotenv from "dotenv"
import { defineConfig } from "drizzle-kit"

dotenv.config()

console.log(process.env.DATABASE_URL!)

export default defineConfig({
  schema: "./src/schema",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
})
