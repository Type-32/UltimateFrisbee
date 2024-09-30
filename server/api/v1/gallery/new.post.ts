import {PrismaClient} from '@prisma/client'
import useServerAuth from "~/composables/useServerAuth";
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    const body = await readBody<{name: string}>(event);
    const header = getHeader(event, 'Authorization')
    // console.log(header)

    if (!body.name || !header) {
        return sendError(event, createError({ statusCode: 400, statusMessage: 'Requires full parameters or headers' }));
    }

    const auth = useServerAuth(event, header)

    const isServerAuthenticated = await auth.validateServerToken()
    if (!isServerAuthenticated) {
        return sendError(event, createError({ statusCode: 403, statusMessage: 'Unauthorized; Please re-login.'}));
    }

    let data = await prisma.gallery.create({
        data: {
            name: body.name as string,
            published: false
        }
    })

    if (!data)
        return sendError(event, createError({statusCode: 401, statusMessage: 'Unsuccessful creation. Try again later.' }));

    return data;
});