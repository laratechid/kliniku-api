import { DoneFuncWithErrOrRes } from "fastify";
import { response } from "../helper/response";
import { Req, Res } from "../types/fastify";

export const middleware = (req: Req, res: Res, done: DoneFuncWithErrOrRes) => {
    const authorization = req.headers.authorization
    if (!authorization) response(res, "unauthorized", 401)
    const [_, token] = authorization.split(" ")
    if (!token) response(res, "token required", 401)
    try {
        req.server.jwt.verify(token, { algorithms: ["HS256"] })
        req.user = req.server.jwt.decode(token)
    } catch (error) {
        response(res, "invalid token", 401)
    }
    done()
}