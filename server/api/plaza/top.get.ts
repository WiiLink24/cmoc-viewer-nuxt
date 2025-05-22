import { db } from "~/drizzle";
import { convertToB64 } from "~/server/utils/base";

defineRouteMeta({
  openAPI: {
    tags: ["Plaza"],
    summary: "Get the Top 50",
    description: "Returns the 50 most liked Miis",
    responses: {
      "200": {
        description: "Top 50 returned",
        content: {
          "application/json": {
            "schema": {
              type: "array",
            }
          }
        }
      }
    }
  }
})

export default defineEventHandler(async () => {
  try {
    const results = await db.query.miis.findMany({
      with: {
        artisan: {
          columns: {
            artisanId: true,
            isMaster: true,
            name: true,
          },
        },
      },
      orderBy: (miis, { desc }) => [desc(miis.permLikes)],
      limit: 50,
    });

    return results.map((row) => {
      return { ...row, miiData: row.miiData ? convertToB64(row.miiData) : "" };
    });
  } catch (error) {
    throw createError({ statusCode: 500, statusMessage: error as string})
  }
});
