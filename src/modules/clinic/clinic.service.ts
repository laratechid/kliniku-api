import { Res } from "../../types/fastify";
import { ClinicRepository } from "./clinic.repository";
import { response } from "../../helper/response";
import { PaginationDto } from "../../dto/pagination.dto";
import dayjs from "dayjs";
import { translateDayCode } from "../../helper/time";

export class ClinicService {
    private clinicRepository: ClinicRepository
    constructor(clinicRepository: ClinicRepository) {
        this.clinicRepository = clinicRepository
    }

    async getOne(res: Res, id: number) {
        const data = await this.clinicRepository.getOne(id)
        if (!data) return response(res, "not found", 400)
        const result =
        {
            ...data,
            openSchedule: "08:00 - 21:00",
            openDays: "Senin - Jumat",
            distance: "2.4 km"
        }
        return result
    }

    async getAll(_: Res, pagination: PaginationDto): Promise<[any[], number]> {
        const [data, count] = await this.clinicRepository.getAll(pagination)
        const currentDayCode = dayjs().day()
        const today = translateDayCode(currentDayCode)

        const response = data.map(clinic => {
            const polyclinics: string[] = []
            let openSchedule = "Closed"
            clinic.schedules.filter(({
                day, startTime, endTime
            }) => { if (day == today) openSchedule = `${startTime} - ${endTime}` })
            clinic.polyclinics.filter(data => polyclinics.push(data.poly.name))
            return ({
                ...clinic, polyclinics, distance: "2.4 km", openSchedule
            })
        })
        return [response, count]
    }
}