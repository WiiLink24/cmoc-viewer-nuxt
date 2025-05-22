import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema";

export const db = drizzle(`postgresql://${process.env.POSTGRES_USERNAME!}:${process.env.POSTGRES_PASSWORD!}@${process.env.POSTGRES_HOST!}:5432/${process.env.POSTGRES_DB!}`, { schema: schema });
