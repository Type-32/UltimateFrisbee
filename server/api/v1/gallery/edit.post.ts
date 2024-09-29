//@ts-ignore
import { v4 as uuidv4 } from 'uuid';
//@ts-ignore
import jwt from 'jsonwebtoken';
import {Media, PrismaClient} from '@prisma/client'
import useServerAuth from "~/composables/useServerAuth";
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    const body = await readBody<{ id: number, name: string, published: boolean, medias: number[]}>(event);
    const header = getHeader(event, 'Authorization')

    if (!body.id || !body.name || !body.published || !body.medias || !header) {
        return sendError(event, createError({ statusCode: 400, statusMessage: 'Cannot access without authorization header.' }));
    }

    const auth = useServerAuth(event, header)

    const isServerAuthenticated = await auth.validateServerToken()
    if (!isServerAuthenticated) {
        return sendError(event, createError({ statusCode: 403, statusMessage: 'Unauthorized; Please re-login.'}));
    }

    let {data: edit, error} = await prisma.gallery.update({
        where: {
            id: body.id,
        },
        data: {
            updatedAt: new Date().toISOString(),
            name: body.name,
            published: body.published,
            medias: {
                connect: body.medias.map(mediaId => ({
                    mediaId: mediaId,
                })),
            },
        }
    })

    if (error)
        return sendError(event, createError({statusCode: 401, statusMessage: 'Gallery not found' }));

    return edit;
});