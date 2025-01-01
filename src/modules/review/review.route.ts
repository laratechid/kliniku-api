import { FastifyInstance } from "fastify";
import { AppDataSource } from "../../config/db";
import { ReviewDto } from "../../dto/review.dto";
import { response } from "../../helper/response";
import { validation } from "../../helper/validation";
import { Req, Res } from "../../types/fastify";
import { ReviewRepository } from "./review.repository";
import { ReviewService } from "./review.service";
import { ClinicRepository } from "../clinic/clinic.repository";
import { reviewSchema } from "./review.schema";
import { middleware } from "../../middleware/middleware";

class Controller {
  private static reviewService = new ReviewService(
    new ReviewRepository(AppDataSource),
    new ClinicRepository(AppDataSource),
  );

  static async create(req: Req, res: Res) {
    const dto = new ReviewDto();
    const dataValue = Object.assign(dto, req.body);
    const { valid, msg } = await validation(dataValue);
    if (!valid) response(res, msg, 400);
    const data = await this.reviewService.create(res, dataValue);
    response(res, data);
  }
}

export function reviewRoutes(route: FastifyInstance) {
  route.addHook("preHandler", middleware);
  route.post("", { schema: reviewSchema.create }, (req, res) =>
    Controller.create(req, res),
  );
}
