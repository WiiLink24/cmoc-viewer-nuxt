import { count, sql } from "drizzle-orm/sql";
import { eq } from "drizzle-orm";
import { db } from "~/drizzle";
import { miis } from "~/drizzle/schema";

export default defineEventHandler(async (event) => {
    const { id } = event.context.params as { id: string };
    const { page } = getQuery<{ page?: string }>(event);

    const artisanId = parseInt(id);
    const pageNumber = page ? parseInt(page) : 1;
    const offset = (pageNumber - 1) * 50;

    const artisan = await db.query.artisans.findFirst({
        columns: {
            artisanId: true,
            name: true,
            countryId: true,
            wiiNumber: true,
            miiData: true,
            isMaster: true,
            numberOfPosts: true,
            totalLikes: true,
            lastPost: true,
        },
        where: (artisans, { eq }) => eq(artisans.artisanId, artisanId),
    }).then((artisan) => {
        if (artisan) {
            return {
                ...artisan,
                miiData: artisan.miiData ? convertToB64(artisan.miiData as unknown as Uint8Array) : '',
            };
        }
        return null;
    });

    if (!artisan) {
        throw createError({
            statusCode: 404,
            statusMessage: "Artisan not found",
        });
    }

    const artisanMiis = await db.query.miis.findMany({
        where: (miis, { eq }) => eq(miis.artisanId, artisanId),
        orderBy: (miis, { desc }) => [desc(miis.entryId)],
        offset: sql.placeholder('pOffset'),
        limit: 50,
    }).prepare("artisan_miis");

    const data = await artisanMiis.execute({ pOffset: offset });
    const artisanData = data.map((row) => {
        return { ...row, miiData: row.miiData ? convertToB64(row.miiData as unknown as Uint8Array) : '' };
    })

    const total_items = await db.select({ count: count() }).from(miis).where(eq(miis.artisanId, artisanId));
    const total_pages = Math.ceil(total_items[0].count / 50);

    const entries = { total_pages: total_pages, miis_data: artisanData };
    const responses = { artisan_data: artisan, entries_data: entries };

    return responses;
})