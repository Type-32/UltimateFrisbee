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
    const {name, id, desc, abbv} = await readBody(event);
    const header = getHeader(event, 'Authorization')

    if (!name || !id || !header || !abbv) {
        return sendError(event, createError({ statusCode: 400, statusMessage: 'Requires full parameters or headers' }));
    }

    const auth = useServerAuth(event, header)

    const isServerAuthenticated = await auth.validateServerToken()
    if (!isServerAuthenticated) {
        return sendError(event, createError({ statusCode: 403, statusMessage: 'Unauthorized; Please re-login.'}));
    }

    let edit = await prisma.team.update({
        where: {
            id: id as number,
        },
        data: {
            team_name: name,
            updatedAt: new Date().toISOString(),
            team_desc: desc || '',
            team_abbv: abbv
        }
    })

    if (!edit)
        return sendError(event, createError({statusCode: 401, statusMessage: 'Team not found' }));

    return edit;
});