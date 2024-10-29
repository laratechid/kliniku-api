import { FastifyInstance } from "fastify"
import { AppDataSource } from "../../config/db"
import { Req, Res } from "../../types/fastify"
import { ClinicRepository } from "./clinic.repository"
import { ClinicService } from "./clinic.service"
import { response, responsePaginate } from "../../helper/response"

class ClinicRoute{
    static clinicRepository = new ClinicRepository(AppDataSource)
    static clinicService = new ClinicService(ClinicRoute.clinicRepository)
    
    static async getOne(req: Req, res: Res){
        const { id } = req.params as { id: number }
        const data = await this.clinicService.getOne(res, id)
        return response(res, data)
    }

    static async getAll(_: Req, res: Res){
        return await this.clinicService.getAll(res)
    }
}

export function clinicRoutes(router: FastifyInstance){
    router.get("/:id", (req, res) => ClinicRoute.getOne(req, res)),
    router.get("/", (req, res) => ClinicRoute.getAll(req, res))
}