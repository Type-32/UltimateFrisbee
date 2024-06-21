import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
export default defineEventHandler(async (event) => {
    const query = getQuery(event)

    try {
        let pageIndex: number = 0
        let pageAmount: number = 9
        let includeUnpublished = (query.unpublished?.valueOf())
        if (query.pagination != null && query.paginatePerPage != null) {
            pageIndex = parseInt(query.pagination as any)
            pageAmount = parseInt(query.paginatePerPage as any)
        }
        let data = null
        if (query.ids != null) {
            if(includeUnpublished)
                data = await prisma.article.findMany({
                    take: pageAmount,
                    skip: pageAmount * pageIndex,
                    where: {
                        id: {
                            in: Array.from(query.ids as any[] as number[], Number)
                        }
                    }
                })
            else
                data = await prisma.article.findMany({
                    take: pageAmount,
                    skip: pageAmount * pageIndex,
                    where: {
                        id: {
                            in: Array.from(query.ids as any[] as number[], Number)
                        },
                        published: true
                    }
                })
        } else {
            if(includeUnpublished)
                data = await prisma.article.findMany({
                    take: pageAmount,
                    skip: pageAmount * pageIndex,
                })
            else
                data = await prisma.article.findMany({
                    take: pageAmount,
                    skip: pageAmount * pageIndex,
                    where: {
                        published: true
                    }
                })
        }

        data = JSON.parse(JSON.stringify(data, (key, value) =>
            typeof value === 'bigint' ? value.toString() : value
        ))

        return data
    } catch (error: any) {
        if (error) {
            console.log(`${event.toString()} -> Error at ${error.message}`)

            return sendError(event, createError({
                status: error.code as any as number,
                message: error.message,
            }))
        }
    }
})