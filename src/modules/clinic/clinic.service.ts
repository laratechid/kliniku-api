import { Res } from "../../types/fastify";
import { ClinicRepository } from "./clinic.repository";
import { response, responsePaginate } from "../../helper/response";
import { PaginationDto } from "../../dto/pagination.dto";

export class ClinicService {
    private clinicRepository: ClinicRepository
    constructor(clinicRepository: ClinicRepository) {
        this.clinicRepository = clinicRepository
    }

    async getOne(res: Res, id: number) {
        const data = await this.clinicRepository.getOne(id)
        if (!data) return response(res, "not found", 400)
        return data
    }

    async getAll(res: Res, pagination: PaginationDto): Promise<[any[], number]> {
        const [data, count] = await this.clinicRepository.getAll(pagination)
        const polyclinics: string[] = []
        data.forEach(data => data.polyclinics
            .forEach(data => polyclinics.push(data.poly.name)))
        const response = data.map(res =>
            ({ ...res, polyclinics, distance: "2.4 km", openSchedule: "08:00 - 21:00" }))
        return [response, count]
    }
}