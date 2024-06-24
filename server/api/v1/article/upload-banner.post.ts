import * as Minio from 'minio'

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const file = body.file;
    const conf = useRuntimeConfig()

    if (!file) {
        throw createError({
            statusCode: 400,
            statusMessage: 'No file provided',
        });
    }

    const minioClient = new Minio.Client({
        endPoint: conf.storageEndpoint as any as string,
        port: conf.storagePort as any as number,
        useSSL: conf.storageUseSSL as any as boolean,
        accessKey: conf.storageAccessKey as any as string,
        secretKey: conf.storageSecretKey as any as string,
    });

    const bucketName = conf.storageName as any as string;
    const objectName = `uploads/${file.name}`;

    try {
        await minioClient.putObject(bucketName, objectName, file.data);
        const fileUrl = await minioClient.presignedGetObject(bucketName, objectName, 24 * 60 * 60); // URL valid for 24 hours

        return {
            fileUrl,
        };
    } catch (error) {
        console.error('Error uploading file:', error);
        throw createError({
            statusCode: 500,
            statusMessage: 'Failed to upload file',
        });
    }
})