import { FastifyInstance } from "fastify";
import { AppDataSource } from "../../config/db";
import { response } from "../../helper/response";
import { Req, Res } from "../../types/fastify";
import { QueueRepository } from "./queue.repository";
import { QueueService } from "./queue.service";

export class Controller {
    private static queueService = new QueueService(
        new QueueRepository(
            AppDataSource
        )
    )

    static async getOne(req: Req, res: Res) {
        const { id } = req.params as { id: number }
        const data = await this.queueService.getOne(res, id)
        return response(res, data)
    }
}

export function queueRoutes(route: FastifyInstance) {
    route.get("/:id", (req, res) => Controller.getOne(req, res))
}