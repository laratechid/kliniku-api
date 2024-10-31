import { PutObjectCommand, PutObjectCommandInput, S3Client } from "@aws-sdk/client-s3";
import { env } from "../config/env";
import dayjs from "dayjs";

const R2Client = new S3Client({
    region: "auto",
    endpoint: env.cflareR2Url,
    credentials: {
        accessKeyId: env.cflareAccessKey,
        secretAccessKey: env.cflareSecretKey,
    },
})

export async function R2UploadSingle(buffer: Buffer, fileName: string, contentType: string) {
    const epoch = dayjs(new Date()).unix()
    const fileNameFmt = fileName.replace(/\s+/g,'-');
    const keyName = `${epoch}-${fileNameFmt}`
    const object = new PutObjectCommand({
        Bucket: env.cflareR2Bucket,
        Key: keyName,
        Body: buffer,
        ContentType: contentType
    })
    await R2Client.send(object)
    return `${env.cflareR2Url}/${env.cflareR2Bucket}/${keyName}`
}