//@ts-ignore
import { v4 as uuidv4 } from 'uuid';
//@ts-ignore
import jwt from 'jsonwebtoken';
import { setCookie } from 'h3';
import {Media, PrismaClient} from '@prisma/client'
import useServerAuth from "~/composables/useServerAuth";
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    const body = await readBody<{name: string, medias: Media[]}>(event);
    const header = getHeader(event, 'Authorization')

    if (!body.name || !body.medias || !header) {
        return sendError(event, createError({ statusCode: 400, statusMessage: 'Requires full parameters or headers' }));
    }

    const auth = useServerAuth(event, header)

    const isServerAuthenticated = await auth.validateServerToken()
    if (!isServerAuthenticated) {
        return sendError(event, createError({ statusCode: 403, statusMessage: 'Unauthorized; Please re-login.'}));
    }

    let edit = await prisma.article.update({
        where: {
            id: body.id as number,
        },
        data: {
            title: body.title,
            description: body.description,
            content: body.content,
            published: body.published,
            updatedAt: new Date().toISOString()
        }
    })

    if (!edit)
        return sendError(event, createError({statusCode: 401, statusMessage: 'Article not found' }));

    return edit;
});