//@ts-ignore
import { v4 as uuidv4 } from 'uuid';
//@ts-ignore
import jwt from 'jsonwebtoken';
import { setCookie } from 'h3';
import { PrismaClient } from '@prisma/client'
import useServerAuth from "~/composables/useServerAuth";
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    const body = await readBody<{ ids: number[] }>(event);

    if(!body.ids)
        return sendError(event, createError({statusCode: 400, statusMessage: 'Not enough parameters.'}))

    const header = getHeader(event, 'Authorization')
    const auth = useServerAuth(event, header as any as string)

    const isServerAuthenticated = await auth.validateServerToken()
    if (!isServerAuthenticated) {
        return sendError(event, createError({ statusCode: 403, statusMessage: 'Unauthorized; Please re-login.'}));
    }

    // Use a transaction to ensure all related entries are deleted before deleting galleries
    const data = await prisma.$transaction(async (prisma) => {
        // First, delete all CategoryOnGalleries entries for these galleries
        await prisma.categoryOnGalleries.deleteMany({
            where: {
                galleryId: {
                    in: body.ids
                }
            }
        });

        // Then, delete all MediaOnGalleries entries for these galleries
        await prisma.mediaOnGalleries.deleteMany({
            where: {
                galleryId: {
                    in: body.ids
                }
            }
        });

        // Finally, delete the galleries
        return prisma.gallery.deleteMany({
            where: {
                id: {
                    in: body.ids
                }
            }
        });
    });

    if (!data)
        return sendError(event, createError({statusCode: 401, statusMessage: 'Gallery not found' }));

    return data;
});