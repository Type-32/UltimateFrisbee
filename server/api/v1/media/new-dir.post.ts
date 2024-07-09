import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import {PrismaClient} from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const { dirPath } = await readBody(event);
    const header = getHeader(event, 'Authorization');

    if (!header) {
        throw createError({
            statusMessage: 'Unauthorized, please re-login.',
            statusCode: 403
        });
    }

    if (!dirPath) {
        throw createError({
            statusCode: 400,
            statusMessage: 'No directory path provided.',
        });
    }

    const fullPath = path.join(process.cwd(), 'media', dirPath);

    try {
        await fs.mkdir(fullPath, { recursive: true });

        prisma.media.create({
            data: {
                url: dirPath,
                fileName: dirPath.split('/')[dirPath.length - 1],
                directory: dirPath,
                isFolder: true
            }
        })

        return { success: true, message: `Directory created: ${dirPath}` };
    } catch (error) {
        console.error('Error creating directory:', error);
        throw createError({
            statusCode: 500,
            statusMessage: 'Error creating directory.',
        });
    }
});