import { FastifyInstance } from "fastify";
import { AppDataSource } from "../../config/db";
import { response } from "../../helper/response";
import { Req, Res } from "../../types/fastify";
import { PolyClinicRepository } from "./polyclinic.repository";
import { PolyClinicService } from "./polyclinic.service";
import { polyClinicSchema } from "./polyclinic.schema";
import { middleware } from "../../middleware/middleware";

class Controller {
    private static polyClinicService = new PolyClinicService(
        new PolyClinicRepository(
            AppDataSource
        )
    )
    static async getDetail(req: Req, res: Res) {
        const { id } = req.params as { id: number }
        const data = await this.polyClinicService.getDetail(res, id)
        return response(res, data)
    }
}

export function polyClinicRoutes(route: FastifyInstance) {
    route.addHook("preHandler", middleware)
    route.get("/:id", { schema: polyClinicSchema.getOne },(req, res) => Controller.getDetail(req, res))
}