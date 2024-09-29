//@ts-ignore
import { v4 as uuidv4 } from 'uuid';
//@ts-ignore
import jwt from 'jsonwebtoken';
import {Media, PrismaClient} from '@prisma/client'
import useServerAuth from "~/composables/useServerAuth";
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    const body = await readBody<{ id: number, name: string, published: boolean, medias: number[]}>(event);
    const header = getHeader(event, 'Authorization') || getHeader(event, 'authorization')

    // console.log(header)
    // console.log(body.id, body.name, body.published, body.medias, header)

    if (!body.id || !body.name || !body.medias || !header) {
        return sendError(event, createError({ statusCode: 400, statusMessage: 'Cannot access without authorization header or parameters.' }));
    }

    const auth = useServerAuth(event, header)

    const isServerAuthenticated = await auth.validateServerToken()
    if (!isServerAuthenticated) {
        return sendError(event, createError({ statusCode: 403, statusMessage: 'Unauthorized; Please re-login.'}));
    }

    let data = await prisma.gallery.update({
        where: {
            id: body.id,
        },
        data: {
            updatedAt: new Date(),
            name: body.name,
            published: body.published,
            medias: {
                deleteMany: {}, // Remove all existing connections
                create: body.medias.map(mediaId => ({
                    assignedAt: new Date(),
                    assignedBy: 'user', // Or you might want to use the authenticated user's info here
                    media: {
                        connect: { id: mediaId }
                    }
                }))
            },
        },
        include: {
            medias: {
                include: {
                    media: true
                }
            }
        }
    })

    if (!data)
        return sendError(event, createError({statusCode: 401, statusMessage: 'Gallery not found' }));

    return data;
});