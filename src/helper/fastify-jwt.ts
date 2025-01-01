import { env } from "../config/env";
import { Req } from "../types/fastify";

export function generateJwtToken(req: Req, payload: any) {
  const token = req.server.jwt.sign(payload, {
    algorithm: "HS256",
    expiresIn: env.jwtExpired,
  });
  return token;
}
