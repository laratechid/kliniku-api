import { FastifyInstance } from "fastify";
import { AppDataSource } from "../../config/db";
import { Req, Res } from "../../types/fastify";
import { ClinicRepository } from "./clinic.repository";
import { ClinicService } from "./clinic.service";
import { response, responsePaginate } from "../../helper/response";
import { PaginationDto } from "../../dto/pagination.dto";
import { validation } from "../../helper/validation";
import { extractPaginate } from "../../helper/pagination";
import { clinicSchema } from "./clinic.schema";
import { middleware } from "../../middleware/middleware";

class Controller {
  private static clinicService = new ClinicService(
    new ClinicRepository(AppDataSource),
  );

  static async getOne(req: Req, res: Res) {
    const { id } = req.params as { id: number };
    const data = await this.clinicService.getOne(res, id);
    response(res, data);
  }

  static async getAll(req: Req, res: Res) {
    const paginate = new PaginationDto();
    const dataValue = Object.assign(paginate, req.query);
    const { valid, msg } = await validation(dataValue);
    if (!valid) response(res, msg, 400);
    const pagination: PaginationDto = extractPaginate(dataValue);
    const [data, total] = await this.clinicService.getAll(res, pagination);
    responsePaginate(res, data, total, pagination.page, pagination.limit);
  }
}

export function clinicRoutes(route: FastifyInstance) {
  route.addHook("preHandler", middleware);
  route.get("/:id", { schema: clinicSchema.getOne }, (req, res) =>
    Controller.getOne(req, res),
  ),
    route.get("", { schema: clinicSchema.getAll }, (req, res) =>
      Controller.getAll(req, res),
    );
}
