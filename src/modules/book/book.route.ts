import { FastifyInstance } from "fastify";
import { AppDataSource as db } from "../../config/db";
import { BookQueueDto, BookSummaryRequestDto } from "../../dto/book";
import { response } from "../../helper/response";
import { validation } from "../../helper/validation";
import { Req, Res } from "../../types/fastify";
import { AppSettingRepository } from "../app-setting/app-setting.repository";
import { PolyClinicRepository } from "../polyclinic/polyclinic.repository";
import { BookService } from "./book.service";
import { bookSchema } from "./book.schema";
import { QueueRepository } from "../queue/queue.repository";
import { PolyClinicService } from "../polyclinic/polyclinic.service";

class Controller {
    private static bookService = new BookService(
        new PolyClinicRepository(db),
        new AppSettingRepository(db),
        new QueueRepository(db),
        new PolyClinicService(new PolyClinicRepository(db))
    )

    static async bookSummary(req: Req, res: Res) {
        const dto = new BookSummaryRequestDto()
        const dataValue = Object.assign(dto, req.query)
        const { valid, msg } = await validation(dataValue)
        if (!valid) return response(res, msg, 400)
        const data = await this.bookService.bookSummary(res, dataValue)
        return response(res, data)
    }

    static async bookQueue(req: Req, res: Res) {
            const dto = new BookQueueDto()
            const dataValue = Object.assign(dto, req.body)
            const { valid, msg } = await validation(dataValue)
            if (!valid) return response(res, msg, 400)
            const data = await this.bookService.bookQueue(res, dataValue, 1)
            return response(res, data)
    }
}

export function bookRoutes(route: FastifyInstance){
    route.get("/summary", { schema: bookSchema.bookSummary }, (req, res)=> Controller.bookSummary(req, res))
    route.post("/queue", { schema: bookSchema.bookQueue }, (req, res)=> Controller.bookQueue(req, res))
}