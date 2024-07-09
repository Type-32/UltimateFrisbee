export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const headers = event.headers

    try {
        return await $fetch('/api/v1/upload-file', {
            method: 'POST',
            body: ({
                file: body.file,
                fileName: `articleAssets/banners/${body.articleId}`
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