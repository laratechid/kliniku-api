import { FastifyInstance } from "fastify"
import { AppDataSource } from "../../config/db"
import { Req, Res } from "../../types/fastify"
import { ClinicRepository } from "./clinic.repository"
import { ClinicService } from "./clinic.service"
import { response, responsePaginate } from "../../helper/response"
import { PaginationDto } from "../../dto/pagination.dto"
import { validation } from "../../helper/validation"
import { extractPaginate } from "../../helper/pagination"

class ClinicRoute{
    static clinicRepository = new ClinicRepository(AppDataSource)
    static clinicService = new ClinicService(ClinicRoute.clinicRepository)
    
    static async getOne(req: Req, res: Res){
        const { id } = req.params as { id: number }
        const data = await this.clinicService.getOne(res, id)
        return response(res, data)
    }

    static async getAll(req: Req, res: Res){
        const paginate = new PaginationDto()
        const dataValue = Object.assign(paginate, req.query)
        const { valid, msg } = await validation(dataValue)
        if(!valid) return response(res, msg, 400)
        const pagination: PaginationDto = extractPaginate(dataValue)
        const [data, total] = await this.clinicService.getAll(res, pagination)
        return responsePaginate(res, data, total, pagination.page, pagination.limit)

    }
}

export function clinicRoutes(router: FastifyInstance){
    router.get("/:id", (req, res) => ClinicRoute.getOne(req, res)),
    router.get("/", (req, res) => ClinicRoute.getAll(req, res))
}