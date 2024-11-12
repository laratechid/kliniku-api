import { OAuth2Client } from "google-auth-library"
import { env } from "./env"

export const OauthClient = new OAuth2Client({
    clientId: env.googleOauthAndroidClientID,
    // clientSecret: env.googleOauthClientSecret,
    // redirectUri: env.googleOauthRedirectUrl
})