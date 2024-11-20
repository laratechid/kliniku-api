import jwt from "jsonwebtoken"
import { env } from "../config/env"

export function generateJwtRefreshToken(payload: any) {
    return jwt.sign(payload, env.jwtRefreshSecret, { algorithm: "HS256", expiresIn: env.jwtRefreshExpired })
}

export function decodeRefreshToken(refreshToken: string) {
    return jwt.decode(refreshToken)
}

export function validateJwtRefreshToken(refreshToken: string) {
    try {
        jwt.verify(refreshToken, env.jwtRefreshSecret, { algorithms: ["HS256"] })
        return true
    } catch {
        return false
    }
}