import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
export default defineEventHandler(async (event) => {
    const query = getQuery(event)

    try {
        let data = null
        if (query.slug != null) {
            data = await prisma.article.findFirst({
                where: {
                    slug: query.slug as any as string
                }
            })
        } else {
            return null
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