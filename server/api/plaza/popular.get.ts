import { count, sql } from "drizzle-orm/sql"
import { db } from "~/drizzle"
import { miis } from "~/drizzle/schema"
import { convertToB64 } from "~/server/utils/base"

defineRouteMeta({
  openAPI: {
    tags: ["Plaza"],
    summary: "Get the newest Miis",
    description: "Returns 50 of the newest Miis available",
    responses: {
      "200": {
        description: "List returned",
        content: {
          "application/json": {
            schema: {
              type: "array",
            },
          },
        },
      },
    },
  },
});

export default defineEventHandler(async (event) => {
    const { page } = getQuery<{ page?: string }>(event)
    const pageNumber = page ? parseInt(page) : 1

    // calculate offset for pagination
    // limit to 50 items displayed per page
    const offset = (pageNumber - 1) * 50

    const query = await db.query.miis.findMany({
        with: {
            artisan: {
                columns: {
                    artisanId: true,
                    isMaster: true,
                    name: true
                }
            }
        },
        orderBy: (miis, { desc }) => [desc(miis.entryId)],
        offset: sql.placeholder('pOffset'),
        limit: 50,
    }).prepare("plaza_popular")

    const data = await query.execute({ pOffset: offset })

    const popular = data.map((row) => {
        return { ...row, miiData: row.miiData ? convertToB64(row.miiData as unknown as Uint8Array) : '' };
    })

    const total_items = await db.select({ count: count() }).from(miis);
    const total_pages = Math.ceil(total_items[0].count / 50)

    return { total_pages: total_pages, data: popular };
})