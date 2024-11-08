import { FastifyInstance } from "fastify";
import { Res } from "../../types/fastify";
import { response } from "../../helper/response";

export function rootRoutes(route: FastifyInstance){
    route.get("", { schema: { tags: ["/"] } }, (_, res: Res)=> response(res, "ok"))
}