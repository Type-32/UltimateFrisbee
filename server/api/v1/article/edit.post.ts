//@ts-ignore
import { v4 as uuidv4 } from 'uuid';
//@ts-ignore
import jwt from 'jsonwebtoken';
import { setCookie } from 'h3';
import { PrismaClient } from '@prisma/client'
import useAuth from "~/composables/useAuth";
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const auth = useAuth()

    if (!body.title || !body.description || !body.content || !body.published || !body.id) {
        return sendError(event, createError({ statusCode: 400, statusMessage: 'Requires full parameters' }));
    }

    await auth.validateToken()
    if (!auth.isAuthenticated) {
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

    edit = JSON.parse(JSON.stringify(edit, (key, value) =>
        typeof value === 'bigint' ? value.toString() : value
    ))

    return edit;
});