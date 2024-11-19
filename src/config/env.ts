import { configDotenv } from "dotenv"
configDotenv()

export const env = {
    appPort: +process.env.APP_PORT,

    mysqlHost: process.env.MYSQL_HOST,
    mysqlDb: process.env.MYSQL_DB,
    mysqlPort: +process.env.MYSQL_PORT,
    mysqlUser: process.env.MYSQL_USER,
    mysqlPass: process.env.MYSQL_PASS,

    jwtSecret: process.env.JWT_SECRET,
    jwtExpired: process.env.JWT_EXPIRED,

    googleOauthClientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
    googleOauthClientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    googleOauthRedirectUrl: process.env.GOOGLE_OAUTH_REDIRECT_URL,

    googleOauthAndroidClientID: process.env.GOOGLE_OAUTH_ANDROID_CLIENT_ID,

    cflareAccountID: process.env.CLOUDFLARE_ACCOUNT_ID,
    cflareAccessKey: process.env.CLOUDFLARE_ACCESS_KEY,
    cflareSecretKey: process.env.CLOUDFLARE_SECRET_KEY,
    cflareR2Bucket: process.env.CLOUDFLARE_R2_BUCKET,
    cflareR2Url: process.env.CLOUDFLARE_R2_URL,
}