import { count, sql } from "drizzle-orm/sql";
import { db } from "~/drizzle";
import { artisans } from "~/drizzle/schema";

defineRouteMeta({
  openAPI: {
    tags: ["Artisans"],
    summary: "Get the newest Artisans",
    description: "Returns 50 of the newest Artisans available",
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
  }}
});

export default defineEventHandler(async (event) => {
    const { page } = getQuery<{ page?: string }>(event);
    const pageNumber = page ? parseInt(page) : 1;

    // calculate offset for pagination
    // limit to 50 items displayed per page
    const offset = (pageNumber - 1) * 50;

    const query = await db.query.artisans.findMany({
      orderBy: (artisans, { asc }) => [asc(artisans.artisanId)],
      offset: sql.placeholder("pOffset"),
      limit: 50,
    }).prepare("artisans");

    const data = await query.execute({ pOffset: offset });

    const artisansData = data.map((row) => {
        return {
            ...row,
            miiData: row.miiData ? convertToB64(row.miiData as unknown as Uint8Array) : "",
        };
    })

    const total_items = await db.select({ count: count() }).from(artisans);
    const total_pages = Math.ceil(total_items[0].count / 50)

    return { total_pages: total_pages, data: artisansData };
});
