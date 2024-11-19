import { env } from "../config/env";
import { Req, Res } from "../types/fastify";

export function generateJwtToken(req: Req, res: Res, payload: any){
    const token = req.server.jwt.sign(payload, { algorithm: "HS256", expiresIn: env.jwtExpired })
    res.setCookie('access_token', token, {
        path: '/',
        httpOnly: true,
        secure: true,
      })
    return token
}