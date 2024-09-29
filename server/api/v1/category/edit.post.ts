//@ts-ignore
import { v4 as uuidv4 } from 'uuid';
//@ts-ignore
import jwt from 'jsonwebtoken';
import {Media, PrismaClient} from '@prisma/client'
import useServerAuth from "~/composables/useServerAuth";
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    const body = await readBody<{ id: number, name: string, galleries: number[]}>(event);
    const header = getHeader(event, 'Authorization')

    if (!body.id || !body.name || !body.galleries || !header) {
        return sendError(event, createError({ statusCode: 400, statusMessage: 'Cannot access without authorization header.' }));
    }

    const auth = useServerAuth(event, header)

    const isServerAuthenticated = await auth.validateServerToken()
    if (!isServerAuthenticated) {
        return sendError(event, createError({ statusCode: 403, statusMessage: 'Unauthorized; Please re-login.'}));
    }

    let edit = await prisma.category.update({
        where: {
            id: body.id,
        },
        data: {
            updatedAt: new Date().toISOString(),
            name: body.name,
            galleries: {
                connect: body.galleries.map(galleryId => ({
                    id: galleryId,
                })),
            },
        }
    })

    if (!edit)
        return sendError(event, createError({statusCode: 401, statusMessage: 'Gallery not found' }));

    return edit;
});