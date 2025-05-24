import { count } from "drizzle-orm/sql"
import { eq, ilike } from "drizzle-orm"
import { db } from "~/drizzle"
import { miis } from "~/drizzle/schema"
import { decodeEntryId } from "~/utils/entry"

export default defineEventHandler(async (event) => {
    const { query, page } = getQuery<{ query?: string, page?: string }>(event)

    const pageNumber = page ? parseInt(page) : 1
    const offset = (pageNumber - 1) * 50

    if (!query) {
        throw createError({
            statusCode: 400,
            statusMessage: "Missing search query",
            message: "Please provide a search query.",
        })
    }

    let searchType: 'id' | 'initials' | 'name'
    const trimmedSearch = query.trim();

    const idRegex = /^[a-fA-F0-9]{4}[-\s]?[a-fA-F0-9]{4}[-\s]?[a-fA-F0-9]{4}$/
    if (idRegex.test(trimmedSearch)) {
        searchType = 'id'
    }

    else if (/^[a-zA-Z]{1,2}$/.test(trimmedSearch)) {
        searchType = 'initials'
    }

    else if (/^[a-zA-Z\s]+$/.test(trimmedSearch)) {
        searchType = 'name'
    }
    else {
        throw createError({
            statusCode: 400,
            statusMessage: "Invalid search format",
            message: "Search must be a name, initials (1-2 letters), or ID (xxxx-xxxx-xxxx format).",
        })
    }

    let whereCondition;
    if (searchType === 'id') {
        whereCondition = eq(miis.entryId, decodeEntryId(parseInt(trimmedSearch.replace(/[-\s]/g, ""))));
    } else if (searchType === 'initials') {
        whereCondition = ilike(miis.initials, `%${trimmedSearch}%`)
    } else {
        whereCondition = ilike(miis.nickname, `%${trimmedSearch}%`)
    }

    const dbquery = await db.query.miis.findMany({
        with: {
            artisan: {
                columns: {
                    artisanId: true,
                    isMaster: true,
                    name: true
                }
            }
        },
        where: whereCondition,
        offset: offset,
        limit: 50,
        },
    ).then((query) => query.map((row) => {
        return { ...row, miiData: row.miiData ? convertToB64(row.miiData as unknown as Uint8Array) : '' };
    }))

    const total_items = await db.select({ count: count() }).from(miis).where(whereCondition)

    const total_pages = Math.ceil(total_items[0].count / 50)

    if (dbquery.length === 0) {
        throw createError({
            statusCode: 404,
            statusMessage: "No results found",
            message: "No Miis match your search criteria.",
        })
    }

    return { total_pages: total_pages, data: dbquery  };
})