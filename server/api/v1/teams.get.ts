import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
export default defineEventHandler(async (event) => {
    const query = getQuery(event)

    try {
        let pageIndex: number = 0
        let pageAmount: number = 14
        if (query.pagination != null && query.paginatePerPage != null) {
            pageIndex = parseInt(query.pagination as any)
            pageAmount = parseInt(query.paginatePerPage as any)
        }
        let data = null
        if (query.ids != null) {
            data = await prisma.team.findMany({
                take: pageAmount,
                skip: pageAmount * pageIndex,
                where: {
                    id: {
                        in: Array.from(query.ids as any[] as number[], Number)
                    }
                }
            })
        } else {
            data = await prisma.team.findMany({
                take: pageAmount,
                skip: pageAmount * pageIndex,
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