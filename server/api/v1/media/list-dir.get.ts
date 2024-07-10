// server/api/media/listDirectory.get.ts

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    const directory = (query.directory as string) || '/'

    try {
        const mediaItems = await prisma.media.findMany({
            where: {
                directory: directory
            },
            orderBy: [
                { isFolder: 'desc' },
                { fileName: 'asc' }
            ]
        });

        const result = {
            currentDirectory: directory,
            parentDirectory: directory === '/' ? null : directory.split('/').slice(0, -1).join('/') || '/',
            items: mediaItems.map(item => ({
                ...item,
                type: item.isFolder ? 'folder' : 'file'
            }))
        };

        return result;
    } catch (error) {
        console.error('Error fetching directory contents:', error);
        throw createError({
            statusCode: 500,
            statusMessage: 'Error fetching directory contents.',
        });
    }
});