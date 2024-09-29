import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    const query = getQuery<{id: number}>(event)
    if(!query.id){
        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid Indexed Media ID.'
        })
    }

    const data = prisma.media.findFirst({
        where:{
            id: query.id as any as number
        }
    })

    if(!data){
        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid Media ID.'
        })
    }

    return data
})