import { FastifyInstance } from "fastify";
import { AuthService } from "./auth.service";

const authService = new AuthService()
export function authRoutes(route: FastifyInstance){
    route.get("", (_, res) => authService.googleAuth(res))
    route.get("/callback", (req, res) => authService.googleAuthCallback(req,res))
}