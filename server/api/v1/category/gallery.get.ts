import {CategoryOnGalleries, PrismaClient} from '@prisma/client'

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
        let data: CategoryOnGalleries[] = []
        if (query.id != null) {
            const queryId = parseInt(query.id as any as string)
            data = await prisma.categoryOnGalleries.findMany({
                where: {
                    galleryId: queryId
                }
            })
        }

        return await prisma.gallery.findMany({
            where: {
                id: {
                    in: data.map(arr => arr.galleryId)
                }
            }
        })
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