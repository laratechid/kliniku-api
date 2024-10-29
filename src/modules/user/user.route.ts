import { FastifyInstance } from "fastify";
import { Req, Res } from "../../types/fastify";
import { UserRepository } from "./user.repository";
import { AppDataSource } from "../../config/db";
import { UserService } from "./user.service";
import { response } from "../../helper/response";

class UserRoute {
    static userRepository = new UserRepository(AppDataSource)
    static userService = new UserService(UserRoute.userRepository)

    static async getUser(req: Req, res: Res){
        const { id } = req.params as { id: number }
        const data = await this.userService.getUser(res, id)
        return response(res, data)
    }
}
export function userRoutes(route: FastifyInstance){
    route.get("/:id", (req, res) => UserRoute.getUser(req, res))
}