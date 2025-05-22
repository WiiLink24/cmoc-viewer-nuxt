import { count, eq, sql } from "drizzle-orm";
import { db } from "~/drizzle"
import { contestMiis } from "~/drizzle/schema";

export default defineEventHandler(async (event) => {
    const { id } = event.context.params as { id: string }
    const { page } = getQuery<{ page: string }>(event)

    const contestId = parseInt(id);
    const pageNumber = page ? parseInt(page) : 1;
    const offset = (pageNumber - 1) * 50;

    const contest_query = await db.query.contests.findFirst({
        where: (contests, { eq }) => eq(contests.contestId, contestId),
    })

    const entries_query = await db.query.contestMiis
      .findMany({
        where: (contestMiis, { eq }) => eq(contestMiis.contestId, contestId),
        offset: sql.placeholder("pOffset"),
        limit: 50,
        columns: {
          artisanId: true,
          countryId: true,
          likes: true,
          miiData: true,
          rank: true,
        },
        orderBy: (contestMiis, { desc }) => [desc(contestMiis.likes)],
      })
      .prepare("contest_entries");

    const data = await entries_query.execute({ pOffset: offset }).then((data) => {
        if (data) {
            return data.map((entry) => {
                return { ...entry, miiData: entry.miiData ? convertToB64(entry.miiData as unknown as Uint8Array) : ''}
            })
        }
        return null;
    });

    const entries_amount = await db.select({ count: count() }).from(contestMiis).where(eq(contestMiis.contestId, contestId))
    const total_pages = Math.ceil(entries_amount[0].count / 50);
    
    const entries = { total_pages, data }

    const response = { contest_query, entries }
    return response
})