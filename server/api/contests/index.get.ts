import { db } from "~/drizzle"

export default defineEventHandler(async () => {
    const query = db.query.contests.findMany()

    return query
})