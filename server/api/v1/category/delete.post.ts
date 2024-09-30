//@ts-ignore
import { v4 as uuidv4 } from 'uuid';
//@ts-ignore
import jwt from 'jsonwebtoken';
import { setCookie } from 'h3';
import { PrismaClient } from '@prisma/client'
import useServerAuth from "~/composables/useServerAuth";
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    if(!body.ids)
        return sendError(event, createError({statusCode: 400, statusMessage: 'Not enough parameters.'}))

    const header = getHeader(event, 'Authorization')
    const auth = useServerAuth(event, header as any as string)

    const isServerAuthenticated = await auth.validateServerToken()
    if (!isServerAuthenticated) {
        return sendError(event, createError({ statusCode: 403, statusMessage: 'Unauthorized; Please re-login.'}));
    }

    const data = await prisma.$transaction(async (prisma) => {
        // First, delete all CategoryOnGalleries entries for these categories
        await prisma.categoryOnGalleries.deleteMany({
            where: {
                categoryId: {
                    in: body.ids as number[]
                }
            }
        });

        // Then, delete the categories
        return prisma.category.deleteMany({
            where: {
                id: {
                    in: body.ids as number[]
                }
            }
        });
    });

    if (!data)
        return sendError(event, createError({statusCode: 401, statusMessage: 'Category not found' }));

    return data;
});