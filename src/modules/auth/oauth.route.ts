import { FastifyInstance } from "fastify";
import { OAuthService } from "./oauth.service";
import { UserRepository } from "../user/user.repository";
import { AppDataSource } from "../../config/db";
import { authSchema } from "./auth.schema";

const authService = new OAuthService(new UserRepository(AppDataSource))
export function oauthRoutes(route: FastifyInstance){
    route.get("", { schema: { tags: ["Google Auth"] } },(req, res) => authService.googleAuth(req,res))
    route.get("/callback", { schema: { tags: ["Google Auth"] } },(req, res) => authService.googleAuthCallback(req,res))
    route.get("/revoke", { schema: { tags: ["Google Auth"] } },(req, res) => authService.googleAuthRevoke(req,res))
    route.get("/info", { schema: { tags: ["Google Auth"] } },(req, res) => authService.googleTokenInfo(req,res))
}