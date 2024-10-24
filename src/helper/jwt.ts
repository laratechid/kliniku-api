import jwt from "jsonwebtoken";
import { env } from "../config/env";

export function generateToken(claim: string | object) {
    return jwt.sign(claim, env.jwtSecret, { algorithm: "HS256" })
}

export function s(token: string) {
    return jwt.verify(token, env.jwtSecret, { algorithms: ["HS256"] })
}