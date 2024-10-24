import { GoogleApis } from "googleapis"
import { env } from "./env"

const googleApi = new GoogleApis
export const OauthClient = new googleApi.auth.OAuth2({
    clientId: env.googleOauthClientID,
    clientSecret: env.googleOauthClientSecret,
    redirectUri: env.googleOauthRedirectUrl
})