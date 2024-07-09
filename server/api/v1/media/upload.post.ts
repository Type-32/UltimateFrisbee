import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { randomUUID } from 'node:crypto';
import {PrismaClient} from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const { file, name } = await readBody<MediaFile>(event);
    const header = getHeader(event, 'Authorization');
    const config = useRuntimeConfig();

    if (!header) {
        throw createError({
            statusMessage: 'Unauthorized, please re-login.',
            statusCode: 403
        });
    }

    if (!file || !name) {
        throw createError({
            statusCode: 400,
            statusMessage: 'No file or name identifier provided.',
        });
    }

    // Generate a unique filename
    const fileExtension = path.extname(name);
    const uniqueFilename = `${randomUUID()}${fileExtension}`;

    // Define the media directory and ensure it exists
    const mediaDir = path.join(process.cwd(), 'media');
    await fs.mkdir(mediaDir, { recursive: true });

    // Define the file path
    const filePath = path.join(mediaDir, uniqueFilename);

    try {
        // Write the file to the server
        await fs.writeFile(filePath, Buffer.from(await file.arrayBuffer()));

        // Generate a permalink
        const permalink = `/media/${uniqueFilename}`;

        prisma.media.create({
            data: {
                fileName: uniqueFilename,
                url: permalink,
                directory: filePath
            }
        })

        return {
            success: true,
            permalink: permalink
        };
    } catch (error) {
        console.error('Error saving file:', error);
        throw createError({
            statusCode: 500,
            statusMessage: 'Error saving file.',
        });
    }
});

interface MediaFile {
    file: File;
    name: string;
}