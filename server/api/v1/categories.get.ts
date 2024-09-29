import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    try {
        let pageIndex: number = 0
        let pageAmount: number = 90
        if (query.pagination != null && query.paginatePerPage != null) {
            pageIndex = parseInt(query.pagination as any)
            pageAmount = parseInt(query.paginatePerPage as any)
        }
        let data = null
        if (query.ids != null) {
            const queryIds = Array.isArray(query.ids)
                ? query.ids.map(Number)
                : [Number(query.ids)];
            data = await prisma.category.findMany({
                where: {
                    id: {
                        in: Array.from(queryIds as any[] as number[], Number)
                    }
                }
            })
        } else {
            data = await prisma.category.findMany({
                select: {
                    id: true,
                    name: true,
                    galleries: true,
                }
            })
        }

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