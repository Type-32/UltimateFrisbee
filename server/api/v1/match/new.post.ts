//@ts-ignore
import { v4 as uuidv4 } from 'uuid';
//@ts-ignore
import jwt from 'jsonwebtoken';
import { setCookie } from 'h3';
import { PrismaClient } from '@prisma/client'
import useServerAuth from "~/composables/useServerAuth";
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    const {home, guest, homeScore, guestScore} = await readBody(event);
    const header = getHeader(event, 'Authorization')
    // console.log(header)

    if (!home || !guest || !header) {
        return sendError(event, createError({ statusCode: 400, statusMessage: 'Requires full parameters or headers' }));
    }

    const auth = useServerAuth(event, header)

    const isServerAuthenticated = await auth.validateServerToken()
    if (!isServerAuthenticated) {
        return sendError(event, createError({ statusCode: 403, statusMessage: 'Unauthorized; Please re-login.'}));
    }

    let data = await prisma.match.create({
        data: {
            homeTeamId: home as any as number,
            guestTeamId: guest as any as number,
            home_score: homeScore || 0,
            guest_score: guestScore || 0
        }
    })

    if (!data)
        return sendError(event, createError({statusCode: 401, statusMessage: 'Unsuccessful creation. Try again later.' }));

    data = JSON.parse(JSON.stringify(data, (key, value) =>
        typeof value === 'bigint' ? value.toString() : value
    ))

    return data;
});