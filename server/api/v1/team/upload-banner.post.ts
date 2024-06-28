export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const headers = event.headers

    try {
        // @ts-ignore
        return await $fetch('/api/v1/upload-file', {
            method: 'POST',
            body: JSON.stringify({
                file: body.file,
                fileName: `teamAssets/banners/${body.teamId}`
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