import { db } from "~/drizzle"
import { decodeEntryId } from "~/utils/entry"

export default defineEventHandler(async (event) => {
    const { entry_id } = getQuery<{ entry_id?: string }>(event)
    if (!entry_id) {
        throw createError({
            statusCode: 400,
            statusMessage: "Missing entry_id",
            message: "Please provide an entry ID.",
        })
    }

    const decoded = decodeEntryId(parseInt(entry_id.replace(/-/g, "")))


    const query = await db.query.miis.findFirst({
        with: {
            artisan: {
                columns: {
                    artisanId: true,
                    isMaster: true,
                    name: true
                }
            }
        },
        where: (miis, { eq }) => eq(miis.entryId, Number(decoded)),
    })

    if (!query) {
        throw createError({
            statusCode: 404,
            statusMessage: "Mii not found",
            message: "The Mii you are looking for does not exist.",
        })
    }

    const data = { ...query, miiData: query.miiData ? convertToB64(query.miiData as unknown as Uint8Array) : '' }

    return data
})