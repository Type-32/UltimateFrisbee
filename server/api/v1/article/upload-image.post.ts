//@ts-ignore
import { v4 as uuidv4 } from 'uuid';
export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const headers = event.headers
    const sessionToken = uuidv4();

    try {
        return await $fetch('/api/v1/upload-file', {
            method: 'POST',
            body: JSON.stringify({
                file: body.file,
                fileName: `articleAssets/images/${body.articleId}-${sessionToken}`
            }),
            headers: headers
        })
    } catch (error: any) {
        throw createError({
            statusCode: error.statusCode,
            statusMessage: error.statusMessage,
        })
    }
})