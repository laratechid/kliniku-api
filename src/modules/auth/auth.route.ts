import { FastifyInstance } from "fastify";
import { AuthService } from "./auth.service";
import { UserRepository } from "../user/user.repository";
import { AppDataSource } from "../../config/db";
import { authSchema } from "./auth.schema";

const authService = new AuthService(new UserRepository(AppDataSource))
export function authRoutes(route: FastifyInstance){
    route.get("", { schema: authSchema.auth },(req, res) => authService.googleAuth(req,res))
    route.get("/callback", { schema: authSchema.callback },(req, res) => authService.googleAuthCallback(req,res))
    route.get("/revoke", { schema: authSchema.revoke },(req, res) => authService.googleAuthRevoke(req,res))
    route.get("/info", { schema: authSchema.info },(req, res) => authService.googleTokenInfo(req,res))
}