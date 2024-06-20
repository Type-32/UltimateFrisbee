//@ts-ignore
import { v4 as uuidv4 } from 'uuid';
//@ts-ignore
import jwt from 'jsonwebtoken';
import { setCookie } from 'h3';
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    // Check if the username and password are provided
    if (!body.username || !body.password) {
        return sendError(event, createError({ statusCode: 400, statusMessage: 'Username and password are required' }));
    }

    // Retrieve the user from the database based on the username
    const user = await prisma.user.findFirst({
        where: {
            username: body.username,
            password: body.password
        }
    });

    // Check if the user exists and the password is correct
    if (!user) {
        return sendError(event, createError({ statusCode: 401, statusMessage: 'Invalid username or password' }));
    }

    // Generate a unique session token
    const sessionToken = uuidv4();
    const jwtToken = jwt.sign({userId: user.id}, sessionToken, { expiresIn: '1h' });

    const entry = await prisma.token.create({
        data: {
            uuid: jwtToken as string,
            userId: user.id
        }
    })

    if(!entry){
        return sendError(event, createError({ statusCode: 500, statusMessage: 'Unable to login due to server error; Records return none.' }));
    }

    // Set the session token as a cookie in the response
    setCookie(event, 'session_token', sessionToken, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 });

    return { message: 'Login successful' };
});