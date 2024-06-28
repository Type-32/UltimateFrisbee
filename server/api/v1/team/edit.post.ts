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
    const body = await readBody(event);
    const header = getHeader(event, 'Authorization')

    if (!body.name || !body.id || !header) {
        return sendError(event, createError({ statusCode: 400, statusMessage: 'Requires full parameters or headers' }));
    }

    const auth = useServerAuth(event, header)

    const isServerAuthenticated = await auth.validateServerToken()
    if (!isServerAuthenticated) {
        return sendError(event, createError({ statusCode: 403, statusMessage: 'Unauthorized; Please re-login.'}));
    }

    let edit = await prisma.team.update({
        where: {
            id: body.id as number,
        },
        data: {
            team_name: body.name,
            updatedAt: new Date().toISOString()
        }
    })

    if (!edit)
        return sendError(event, createError({statusCode: 401, statusMessage: 'team not found' }));

    edit = JSON.parse(JSON.stringify(edit, (key, value) =>
        typeof value === 'bigint' ? value.toString() : value
    ))

    return edit;
});