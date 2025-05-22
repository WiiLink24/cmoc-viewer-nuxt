import { sql } from "drizzle-orm/sql";
import { db } from "~/drizzle";

export default defineEventHandler(async (event) => {
    const { page } = getQuery<{ page?: string }>(event);
    const pageNumber = page ? parseInt(page) : 1;

    // calculate offset for pagination
    // limit to 50 items displayed per page
    const offset = (pageNumber - 1) * 50;

    const artisans = await db.query.artisans.findMany({
      orderBy: (artisans, { asc }) => [asc(artisans.artisanId)],
      offset: sql.placeholder("pOffset"),
      limit: 50,
    }).prepare("artisans");

    const data = await artisans.execute({ pOffset: offset });



});
