import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
export default defineEventHandler(async (event) => {
    const query = getQuery<{pagination: number, paginatePerPage: number, getUnpublished: boolean, ids: number[]}>(event)
    try {
        let pageIndex: number = 0
        let pageAmount: number = 90
        if (query.pagination != null && query.paginatePerPage != null) {
            pageIndex = parseInt(query.pagination as any)
            pageAmount = parseInt(query.paginatePerPage as any)
        }
        let data = null
        let getUnpublished = query.getUnpublished
        if (query.ids != null) {
            const queryIds = Array.isArray(query.ids)
                ? query.ids.map(Number)
                : [Number(query.ids)];
            if(getUnpublished) {
                data = await prisma.gallery.findMany({
                    where: {
                        id: {
                            in: Array.from(queryIds as any[] as number[], Number)
                        }
                    }
                })
                // console.log("ids not null, getUnpublished true")
            } else {
                data = await prisma.gallery.findMany({
                    where: {
                        id: {
                            in: Array.from(queryIds as any[] as number[], Number)
                        },
                        published: true
                    }
                })
                // console.log("ids not null, getUnpublished false")
            }

        } else {
            if(getUnpublished) {
                data = await prisma.gallery.findMany()
                // console.log("ids null, getUnpublished true")
            } else {
                data = await prisma.gallery.findMany({
                    where: {
                        published: true
                    }
                })
                // console.log("ids null, getUnpublished false")
            }
        }
        // console.log(data, getUnpublished)
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