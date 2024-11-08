import { Req, Res } from "../../types/fastify";
import { response } from "../../helper/response";
import { OauthClient } from "../../config/google";
import { GoogleAuthCallback, GoogleAuthUserInfo } from "../../interface/google";
import { google } from "googleapis";
import { UserRepository } from "../user/user.repository";
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
        const fetchUser = await this.userRepo.fetchUser({ identifier: data.id })
        if (fetchUser) {
            const user = data as object as GoogleAuthUserInfo
            successLog(user)
            res.setCookie("oauthSecret", gToken, { path: "/" })
            return response(res, gToken)
        } else {
            const e = new User()
            e.email = data.email;
            e.name = data.name;
            e.identifier = data.id
            await this.userRepo.createUser(e)
            const user = data as object as GoogleAuthUserInfo
            successLog(user)
            res.setCookie("oauthSecret", gToken)
            return response(res, gToken)
        }
    }

    async googleAuthRevoke(req: Req, res: Res) {
        try {
            const token = req.cookies["oauthSecret"]
            await OauthClient.revokeToken(token)
            res.clearCookie("oauthSecret")
            return response(res, "logout")
        } catch (error) {
            return response(res, "revoke failed", 400)
        }
    }

    async googleTokenInfo(req: Req, res: Res) {
        const token = req.cookies["oauthSecret"]
        const info = await OauthClient.getTokenInfo(token)
        return response(res, info)
    }
}