import { FastifyInstance } from "fastify";
import { AuthService } from "./auth.service";
import { UserRepository } from "../user/user.repository";
import { AppDataSource } from "../../config/db";

const authService = new AuthService(new UserRepository(AppDataSource))
export function authRoutes(route: FastifyInstance){
    route.get("", (req, res) => authService.googleAuth(req,res))
    route.get("/callback", (req, res) => authService.googleAuthCallback(req,res))
    route.get("/revoke", (req, res) => authService.googleAuthRevoke(req,res))
    route.get("/info", (req, res) => authService.googleTokenInfo(req,res))
}