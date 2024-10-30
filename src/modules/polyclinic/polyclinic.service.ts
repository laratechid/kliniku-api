import { polyEvent } from "../../const/event";
import { response } from "../../helper/response";
import { emitEvent } from "../../service/socket.io";
import { Res } from "../../types/fastify";
import { PolyClinicRepository } from "./polyclinic.repository";

export class PolyClinicService{
    private polyClinicRepo: PolyClinicRepository
    constructor(polyClinicRepository: PolyClinicRepository){
        this.polyClinicRepo = polyClinicRepository
    }

    async getDetail(res: Res, id: number){
        const data = await this.polyClinicRepo.getDetail(id)
        if(!data) return response(res, "not found", 400)
        emitEvent(res, polyEvent(id), data)
        return data
    }
}