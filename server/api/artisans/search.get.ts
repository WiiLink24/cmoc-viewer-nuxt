import { count, eq, ilike } from "drizzle-orm/sql"
import { db } from "~/drizzle"
import { artisans } from "~/drizzle/schema"

export default defineEventHandler(async (event) => {
    const { query, page } = getQuery<{ query?: string, page?: string }>(event)

    const pageNumber = page ? parseInt(page) : 1
    const offset = (pageNumber - 1) * 50

    if (!query) {
        throw createError({
            statusCode: 400,
            statusMessage: "Missing query",
            message: "Please provide a search query.",
        })
    }

    let searchType
    const idRegex = /^[a-fA-F0-9]{4}[-\s]?[a-fA-F0-9]{4}[-\s]?[a-fA-F0-9]{4}$/
    if (idRegex.test(query.trim())) {
        searchType = 'id'
    } else {
        searchType = 'name'
    }

    let whereCondition
    if (searchType === 'id') {
        whereCondition = eq(artisans.wiiNumber, parseInt(query.replace(/[-\s]/g, "")))
    } else {
        whereCondition = ilike(artisans.name, `%${query}%`)
    }

    const dbquery = await db.query.artisans.findMany({
        columns: {
            artisanId: true,
            name: true,
            isMaster: true,
            countryId: true,
            lastPost: true,
            miiData: true,
            totalLikes: true,
            wiiNumber: true,
        },
        where: whereCondition,
        limit: 50,
        offset: offset,
    })

    if (dbquery.length === 0) {
        throw createError({
            statusCode: 404,
            statusMessage: "No artisans found",
            message: "No artisans match your search criteria.",
        })
    }

    dbquery.map((artisan) => {
        artisan.miiData = artisan.miiData ? convertToB64(artisan.miiData as unknown as Uint8Array) : ''
    })

    const total_items = await db.select({ count: count() }).from(artisans).where(whereCondition)
    const totalPages = Math.ceil(total_items[0].count / 50)

    return { total_pages: totalPages, data: dbquery }
})