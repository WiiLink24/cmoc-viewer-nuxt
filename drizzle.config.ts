import "dotenv/config";
import { defineConfig } from "drizzle-kit";

console.log(process.env.POSTGRES_HOST)
console.log(process.env.POSTGRES_USERNAME)
console.log(process.env.POSTGRES_PASSWORD)
console.log(process.env.POSTGRES_DB)

export default defineConfig({
  out: "./drizzle",
  dialect: "postgresql",
  schema: "./drizzle/schema.ts",
  dbCredentials: {
    host: process.env.POSTGRES_HOST!,
    port: 5432,
    user: process.env.POSTGRES_USERNAME!,
    password: process.env.POSTGRES_PASSWORD!,
    database: process.env.POSTGRES_DB!,
    ssl: false,
  },
});
