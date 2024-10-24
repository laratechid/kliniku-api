import { Req, Res } from "../../types/fastify";
import { response } from "../../helper/response";
import { OauthClient } from "../../config/google";
import { GoogleAuthCallback, GoogleAuthUserInfo } from "../../interface/google";
import { google } from "googleapis";
import { UserRepository } from "../user/user.repository";
import { generateToken } from "../../helper/jwt";
import { User } from "../../entity/user";
import { successLog } from "../../helper/logger";

export class AuthService {
    private userRepo: UserRepository
    constructor(userRepo: UserRepository) {
        this.userRepo = userRepo
    }
    googleAuth(_: Req, res: Res) {
        const scopes: string[] = [
            "https://www.googleapis.com/auth/userinfo.email",
            "https://www.googleapis.com/auth/userinfo.profile"
        ]
        const authorizationUrl = OauthClient.generateAuthUrl({
            scope: scopes,
            access_type: "offline",
            include_granted_scopes: true
        })
        return response(res, authorizationUrl)
    }

    async googleAuthCallback(req: Req, res: Res) {
        const { code } = req.query as GoogleAuthCallback
        const { tokens } = await OauthClient.getToken(code)
        OauthClient.setCredentials(tokens)
        const { data } = await google.oauth2({
            auth: OauthClient,
            version: "v2"
        }).userinfo.get()
        const gToken: string = tokens.access_token
        const fetchUser = await this.userRepo.fetchUser({ email: data.email })
        if (fetchUser) {
            const { id, email } = fetchUser
            const userToken = generateToken({ id, email })
            const user = data as object as GoogleAuthUserInfo
            successLog(user)
            res.setCookie("gToken", gToken, { path: "/" })
            res.setCookie("userToken", userToken, { path: "/" })
            return response(res, { gToken, userToken })
        } else {
            const entity = new User()
            entity.email = data.email;
            entity.name = data.name;
            const newUser = await this.userRepo.createUser(entity)
            const { id, email } = newUser
            const userToken = generateToken({ id, email })
            const user = data as object as GoogleAuthUserInfo
            successLog(user)
            res.setCookie("gToken", gToken)
            res.setCookie("userToken", userToken, { path: "/" })
            return response(res, { gToken, userToken })
        }
    }

    async googleAuthRevoke(_: Req, res: Res) {
        try {
            await OauthClient.revokeCredentials()
            return response(res, "logout")
        } catch (error) {
            return response(res, "revoke failed", 400)
        }
    }

    async googleTokenInfo(req: Req, res: Res) {
        const token = req.cookies["gToken"]
        const info = await OauthClient.getTokenInfo(token)
        return response(res, info)
    }
}