import * as Minio from 'minio'
import * as Fs from "node:fs";

// @ts-ignore
// import {storeFileLocally} from "nuxt-file-storage/dist/runtime/server/utils/storage";

export default defineEventHandler(async (event) => {
    const {file, fileName} = await readBody<{file: File, fileName: string}>(event);
    const header = getHeader(event, 'Authorization')
    const conf = useRuntimeConfig()

    if (!header) {
        throw createError({
            statusMessage: 'Unauthorized, please re-login.',
            statusCode: 403
        });
    }

    if (!file) {
        throw createError({
            statusCode: 400,
            statusMessage: 'No file provided',
        });
    }

    // const result = await storeFileLocally(
    //     file,         // the file object
    //     8,
    //     '/userFiles'
    // )

    // const minioClient = new Minio.Client({
    //     endPoint: conf.storageEndpoint as any as string,
    //     port: conf.storagePort as any as number,
    //     useSSL: conf.storageUseSSL as any as boolean,
    //     accessKey: conf.storageAccessKey as any as string,
    //     secretKey: conf.storageSecretKey as any as string,
    // });
    //
    // const bucketName = conf.storageName as any as string;
    // const objectName = `uploads/${fileName}`;
    // const fileStream = Fs.createReadStream(file)
    //
    // try {
    //     await minioClient.putObject(bucketName, objectName, fileStream);
    //     const fileUrl = await minioClient.presignedGetObject(bucketName, objectName, 24 * 60 * 60 * 365); // URL valid for 24 hours
    //
    //     return {
    //         fileUrl,
    //     };
    // } catch (error) {
    //     console.error('Error uploading file:', error);
    //     throw createError({
    //         statusCode: 500,
    //         statusMessage: 'Failed to upload file',
    //     });
    // }
})