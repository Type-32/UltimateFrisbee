
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
export default defineEventHandler(async (event) => {
    const {token} = await readBody(event)
    if (!token) {
        return sendError(event, createError({ statusCode: 403, statusMessage: 'token is required' }));
    }

    const data = await prisma.token.findFirst({
        where: {
            uuid: token.uuid
        }
    })

    return {valid: !!data, data}
})