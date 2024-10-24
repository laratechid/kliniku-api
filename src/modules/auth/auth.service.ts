import { Req, Res } from "../../types/fastify";
import { response } from "../../helper/response";
import { OauthClient } from "../../config/google";

export class AuthService{
    googleAuth(res: Res){
        const scopes : string[] = [
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

    googleAuthCallback(req: Req, res: Res){
        const query = req.query
        console.log(query, "==========> query")
        return response(res, query)
    }
}