//@ts-ignore
import { v4 as uuidv4 } from 'uuid';
//@ts-ignore
import jwt from 'jsonwebtoken';
import { setCookie } from 'h3';
import { PrismaClient } from '@prisma/client'
import useAuth from "~/composables/useAuth";
import useServerAuth from "~/composables/useServerAuth";
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    if (!body.id) {
        return sendError(event, createError({ statusCode: 400, statusMessage: 'Requires full parameters' }));
    }

    const header = getHeader(event, 'Authorization')
    const auth = useServerAuth(event, header as any as string)

    const isServerAuthenticated = await auth.validateServerToken()
    if (!isServerAuthenticated) {
        return sendError(event, createError({ statusCode: 403, statusMessage: 'Unauthorized; Please re-login.'}));
    }

    let {data, error} = await prisma.gallery.update({
        where: {
            id: body.id as number,
        },
        data: {
            published: false
        }
    })

    if (error)
        return sendError(event, createError({statusCode: 401, statusMessage: 'An error occurred while unpublishing this gallery. Try again later.' }));

    return data;
});