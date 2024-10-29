import { Res } from "../../types/fastify";
import { ClinicRepository } from "./clinic.repository";
import { response, responsePaginate } from "../../helper/response";
import { PaginationDto } from "../../dto/pagination.dto";

export class ClinicService{
    private clinicRepository: ClinicRepository
    constructor(clinicRepository: ClinicRepository){
        this.clinicRepository = clinicRepository
    }

    async getOne(res: Res, id: number) {
        const data = await this.clinicRepository.getOne(id)
        if (!data) return response(res, "not found", 400)
        return data
    }

    async getAll(res: Res, pagination: PaginationDto){
        return await this.clinicRepository.getAll(pagination)
    }
}