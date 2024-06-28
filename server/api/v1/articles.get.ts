import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    const query = getQuery(event)

    try {
        let pageIndex: number = 0
        let pageAmount: number = 9
        let includeUnpublished = query.unpublished === 'true'

        if (query.pagination != null && query.paginatePerPage != null) {
            pageIndex = parseInt(query.pagination as string)
            pageAmount = parseInt(query.paginatePerPage as string)
        }

        let data = null

        if (query.ids != null) {
            // Ensure ids is always treated as an array
            const queryIds = Array.isArray(query.ids)
                ? query.ids.map(Number)
                : [Number(query.ids)];

            data = await prisma.article.findMany({
                take: pageAmount,
                skip: pageAmount * pageIndex,
                where: {
                    id: { in: queryIds }
                }
            })

            // console.log(`${event.toString()} -> fetch data: ${data.length}, ${data.at(0)}, ${queryIds.toString()}`)
        } else {
            if (includeUnpublished) {
                data = await prisma.article.findMany({
                    take: pageAmount,
                    skip: pageAmount * pageIndex,
                })
            } else {
                data = await prisma.article.findMany({
                    take: pageAmount,
                    skip: pageAmount * pageIndex,
                    where: {
                        published: true
                    }
                })
            }
        }

        data = JSON.parse(JSON.stringify(data, (key, value) =>
            typeof value === 'bigint' ? value.toString() : value
        ))

        return data
    } catch (error: any) {
        console.log(`${event.toString()} -> Error at ${error.message}`)

        return sendError(event, createError({
            status: error.code as number,
            message: error.message,
        }))
    }
})