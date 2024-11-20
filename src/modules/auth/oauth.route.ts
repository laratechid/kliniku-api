import { FastifyInstance } from "fastify";
import { OAuthService } from "./oauth.service";
import { UserRepository } from "../user/user.repository";
import { AppDataSource as DB } from "../../config/db";
import { Req, Res } from "../../types/fastify";
import { GoogleRegisterDto } from "../../dto/auth";
import { validation } from "../../helper/validation";
import { response } from "../../helper/response";
import { generateJwtToken } from "../../helper/fastify-jwt";
import { targetConstructorToSchema } from "class-validator-jsonschema";
import { generateJwtRefreshToken } from "../../helper/jwt";

class Controller {
    private static oauthService = new OAuthService(new UserRepository(DB))

    static async register(req: Req, res: Res) {
        const user = new GoogleRegisterDto()
        const dataValue = Object.assign(user, req.body)
        const { valid, msg } = await validation(dataValue)
        if (!valid) response(res, msg, 400)
        const { id, name, identifier, email } = await this.oauthService.register(res, dataValue)
        const payload = { id, name, identifier, email }
        const token = generateJwtToken(req, payload)
        const refreshToken = generateJwtRefreshToken(payload)
        response(res, { token, refreshToken })
    }
}

export function oauthRoutes(route: FastifyInstance) {
    route.post("/register", { schema: { tags: ["Google Auth"], body: targetConstructorToSchema(GoogleRegisterDto) } }, (req, res) => Controller.register(req, res))
    // route.get("/callback", { schema: { tags: ["Google Auth"] } },(req, res) => authService.googleAuthCallback(req,res))
    // route.get("/revoke", { schema: { tags: ["Google Auth"] } },(req, res) => authService.googleAuthRevoke(req,res))
    // route.get("/info", { schema: { tags: ["Google Auth"] } },(req, res) => authService.googleTokenInfo(req,res))
}