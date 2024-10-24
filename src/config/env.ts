import { configDotenv } from "dotenv"
configDotenv()

export const env = {
    appPort : +process.env.APP_PORT,

    mysqlHost: process.env.MYSQL_HOST,
    mysqlDb: process.env.MYSQL_DB,
    mysqlPort: +process.env.MYSQL_PORT,
    mysqlUser: process.env.MYSQL_USER,
    mysqlPass: process.env.MYSQL_PASS,

    jwtSecret: process.env.JWT_SECRET,
    
    googleOauthClientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
    googleOauthClientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    googleOauthRedirectUrl: process.env.GOOGLE_OAUTH_REDIRECT_URL
}