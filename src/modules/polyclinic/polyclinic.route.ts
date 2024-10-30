import { FastifyInstance } from "fastify";
import { AppDataSource } from "../../config/db";
import { response } from "../../helper/response";
import { Req, Res } from "../../types/fastify";
import { PolyClinicRepository } from "./polyclinic.repository";
import { PolyClinicService } from "./polyclinic.service";

class PolyClinicRoute{
    static polyClinicRepository = new PolyClinicRepository(AppDataSource)
    static polyClinicService = new PolyClinicService(this.polyClinicRepository)
    
    static async getDetail(req: Req, res: Res){
        const { id } = req.params as { id: number }
        const data = await this.polyClinicService.getDetail(res, id)
        return response(res, data)
    }
}

export function polyClinicRoutes(route: FastifyInstance){
    route.get("/:id", (req, res)=> PolyClinicRoute.getDetail(req, res))
}