//@ts-ignore
import { v4 as uuidv4 } from 'uuid';
//@ts-ignore
import jwt from 'jsonwebtoken';
import { setCookie } from 'h3';
import { PrismaClient } from '@prisma/client'
import useServerAuth from "~/composables/useServerAuth";
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    const {name, desc, abbv, banner} = await readBody(event);
    const header = getHeader(event, 'Authorization')
    // console.log(header)

    // TODO Impl. Banner
    if (!name || !abbv || !header) {
        return sendError(event, createError({ statusCode: 400, statusMessage: 'Requires full parameters or headers' }));
    }

    const auth = useServerAuth(event, header)

    const isServerAuthenticated = await auth.validateServerToken()
    if (!isServerAuthenticated) {
        return sendError(event, createError({ statusCode: 403, statusMessage: 'Unauthorized; Please re-login.'}));
    }

    let data = await prisma.team.create({
        data: {
            team_name: name as any as string,
            team_icon: '',
            team_desc: desc as string || '',
            team_abbv: abbv as string
        }
    })

    if (!data)
        return sendError(event, createError({statusCode: 401, statusMessage: 'Unsuccessful creation. Try again later.' }));

    // let secdat = await $fetch('/api/v1/team/edit-banner', {
    //     method: 'POST',
    //     body: ({
    //         id: data.id,
    //         banner: body.banner
    //     })
    // })

    return data;
});