import { DoneFuncWithErrOrRes } from "fastify";
import { OauthClient } from "../config/google";
import { response } from "../helper/response";
import { Req, Res } from "../types/fastify";

export const middleware = (req: Req, res: Res, done: DoneFuncWithErrOrRes) => {
    const authorization = req.headers.authorization
    if (!authorization) return response(res, "unauthorized", 401)
    const [_, token] = authorization.split(" ")
    if (!token) return response(res, "invalid token", 401)
    OauthClient.verifyIdToken({ idToken: token })
    .then(() => done())
    .catch(() => response(res, "unauthorized oauth", 401))
}