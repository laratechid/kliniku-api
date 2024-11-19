import { Res } from "../../types/fastify";
import { OauthClient } from "../../config/google";
import { UserRepository } from "../user/user.repository";
import { User } from "../../entity/user";
import { GoogleRegisterDto } from "../../dto/auth";
import { LoginTicket } from "google-auth-library";
import { response } from "../../helper/response";
import { RegisterOpt } from "../../enum/auth";

export class OAuthService {
    private userRepo: UserRepository
    constructor(userRepo: UserRepository) {
        this.userRepo = userRepo
    }

    async register(res: Res, dto: GoogleRegisterDto){
        let token: LoginTicket
        try {
            token = await OauthClient.verifyIdToken({ idToken: dto.idToken })
        } catch (error) {
            response(res, "invalid google oauth token", 403)
        }
        const userId = token.getUserId()
        const isAccountExist = await this.userRepo.fetchUser({ identifier: userId })
        if(isAccountExist) return isAccountExist
        const { name, email } = token.getPayload()
        const entity = new User()
        entity.registerOpt = RegisterOpt.GOOGLE
        entity.name = name
        entity.email = email
        entity.identifier = userId
        return await this.userRepo.createUser(entity)
    }
    // googleAuth(_: Req, res: Res) {
    //     const scopes: string[] = [
    //         "https://www.googleapis.com/auth/userinfo.email",
    //         "https://www.googleapis.com/auth/userinfo.profile"
    //     ]
    //     const authorizationUrl = OauthClient.generateAuthUrl({
    //         scope: scopes,
    //         access_type: "offline",
    //         include_granted_scopes: true
    //     })
    //     response(res, authorizationUrl)
    // }

    // async googleAuthCallback(req: Req, res: Res) {
    //     const { code } = req.query as GoogleAuthCallback
    //     const { tokens } = await OauthClient.getToken(code)
    //     OauthClient.setCredentials(tokens)
    //     const { data } = await google.oauth2({
    //         auth: OauthClient,
    //         version: "v2"
    //     }).userinfo.get()
    //     const token: string = tokens.id_token
    //     const accessToken: string = tokens.access_token
    //     const fetchUser = await this.userRepo.fetchUser({ identifier: data.id })
    //     if (fetchUser) {
    //         const user = data as object as GoogleAuthUserInfo
    //         successLog(user)
    //         res.setCookie("token", token)
    //         res.setCookie("access_token", accessToken)
    //         response(res, token)
    //     } else {
    //         const e = new User()
    //         e.email = data.email;
    //         e.name = data.name;
    //         e.identifier = data.id
    //         await this.userRepo.createUser(e)
    //         const user = data as object as GoogleAuthUserInfo
    //         successLog(user)
    //         res.setCookie("token", token)
    //         res.setCookie("access_token", accessToken)
    //         response(res, token)
    //     }
    // }

    // async googleAuthRevoke(req: Req, res: Res) {
    //     try {
    //         const accessToken = req.cookies["access_token"]
    //         await OauthClient.revokeToken(accessToken)
    //         res.clearCookie("token")
    //         res.clearCookie("access_token")
    //         response(res, "logout")
    //     } catch (error) {
    //         response(res, "revoke failed", 400)
    //     }
    // }

    // async googleTokenInfo(req: Req, res: Res) {
    //     const token = req.cookies["access_token"]
    //     const info = await OauthClient.getTokenInfo(token)
    //     response(res, info)
    // }
}