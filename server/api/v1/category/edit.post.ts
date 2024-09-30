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
            updatedAt: new Date(),
            name: body.name,
            CategoryOnGalleries: {
                deleteMany: {}, // Remove all existing connections
                create: body.galleries.map(galleryId => ({
                    assignedAt: new Date(),
                    assignedBy: 'user', // Or you might want to use the authenticated user's info here
                    gallery: {
                        connect: { id: galleryId }
                    }
                }))
            },
        },
        include: {
            CategoryOnGalleries: {
                include: {
                    gallery: true
                }
            }
        }
    })

    if (!edit)
        return sendError(event, createError({statusCode: 401, statusMessage: 'Category not found' }));

    return edit;
});