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
    const {id, homeId, guestId, homeScore, guestScore} = await readBody(event);
    const header = getHeader(event, 'Authorization')

    if (!homeScore || !guestScore || !homeId || !guestId || !id || !header) {
        return sendError(event, createError({ statusCode: 400, statusMessage: 'Requires full parameters or headers' }));
    }

    const auth = useServerAuth(event, header)

    const isServerAuthenticated = await auth.validateServerToken()
    if (!isServerAuthenticated) {
        return sendError(event, createError({ statusCode: 403, statusMessage: 'Unauthorized; Please re-login.'}));
    }

    let edit = await prisma.match.update({
        where: {
            id: id as number,
        },
        data: {
            home_score: homeScore as any as number,
            guest_score: guestScore as any as number,
            homeTeamId: homeId as number,
            guestTeamId: guestId as number,
            updatedAt: new Date().toISOString()
        }
    })

    if (!edit)
        return sendError(event, createError({statusCode: 401, statusMessage: 'match not found' }));

    return edit;
});