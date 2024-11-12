import { polyEvent } from "../../const/event";
import { Queue } from "../../entity/queue";
import { QueueStatus } from "../../enum/queue";
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
        const { queues } = data
        const totalQueue = (queues.length + 1)
        for (let index = totalQueue ; index < totalQueue + 15 ; index++) {
            const queue = new Queue() 
            queue.status = "EMPTY" as QueueStatus
            queue.sequence = index
            queues.push(queue)
        }
        if(!data) return response(res, "not found", 400)
        emitEvent(res, polyEvent(id), data)
        return data
    }
}