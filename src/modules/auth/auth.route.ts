import { FastifyInstance } from "fastify";
import { AppDataSource as DB } from "../../config/db";
import { UserDto } from "../../dto/user";
import { response } from "../../helper/response";
import { validation } from "../../helper/validation";
import { Req, Res } from "../../types/fastify";
import { UserRepository } from "../user/user.repository";
import { AuthService } from "./auth.service";
import { targetConstructorToSchema } from "class-validator-jsonschema";
import { LoginDto } from "../../dto/auth";
import { generateJwtToken } from "../../helper/fastify-jwt";

class Controller{
    private static authService = new AuthService(new UserRepository(DB))

    static async register(req: Req, res: Res) {
        const user = new UserDto()
        const dataValue = Object.assign(user, req.body)
        const { valid, msg } = await validation(dataValue)
        if (!valid) response(res, msg, 400)
        const { id, name, identifier, email } = await this.authService.register(res, dataValue)
        const payload = { id, name, identifier, email }
        const token = generateJwtToken(req, res, payload)
        response(res, token)
    }

    static async login(req: Req, res: Res) {
        const user = new LoginDto()
        const dataValue = Object.assign(user, req.body)
        const { valid, msg } = await validation(dataValue)
        if (!valid) response(res, msg, 400)
        const { id, name, identifier, email } = await this.authService.login(res, dataValue)
        const payload = { id, name, identifier, email }
        const token = generateJwtToken(req, res, payload)
        response(res, token)
    }
}

export function authRoutes(route: FastifyInstance){
    route.post("/register", { schema: { tags: ["Auth"], body: targetConstructorToSchema(UserDto) } }, (req, res) => Controller.register(req, res))
    route.post("/login", { schema: { tags: ["Auth"], body: targetConstructorToSchema(LoginDto) } }, (req, res) => Controller.login(req, res))
}