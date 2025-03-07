import { FastifyInstance } from "fastify";
import { AppDataSource } from "../../config/db";
import { response } from "../../helper/response";
import { Req, Res } from "../../types/fastify";
import { QueueRepository } from "./queue.repository";
import { QueueService } from "./queue.service";
import { UpdateQueueDto } from "../../dto/queue.dto";
import { validation } from "../../helper/validation";
import { PolyClinicService } from "../polyclinic/polyclinic.service";
import { PolyClinicRepository } from "../polyclinic/polyclinic.repository";
import { queueSchema } from "./queue.schema";
import { middleware } from "../../middleware/middleware";
import { UserJwtPayload } from "../../types/jwt";

class Controller {
  private static queueService = new QueueService(
    new QueueRepository(AppDataSource),
    new PolyClinicService(new PolyClinicRepository(AppDataSource)),
  );

  static async getOne(req: Req, res: Res) {
    const { id } = req.params as { id: number };
    const data = await this.queueService.getOne(res, id);
    response(res, data);
  }

  static async update(req: Req, res: Res) {
    const { id } = req.params as { id: number };
    const user = req.user as UserJwtPayload;
    const dto = new UpdateQueueDto();
    const dataValue = Object.assign(dto, req.body);
    const { valid, msg } = await validation(dataValue);
    if (!valid) response(res, msg, 400);
    const data = await this.queueService.update(res, dataValue, id);
    response(res, data);
  }
}

export function queueRoutes(route: FastifyInstance) {
  route.addHook("preHandler", middleware);
  route.patch("/:id", { schema: queueSchema.update }, (req, res) =>
    Controller.update(req, res),
  ),
    route.get("/:id", { schema: queueSchema.getOne }, (req, res) =>
      Controller.getOne(req, res),
    );
}
