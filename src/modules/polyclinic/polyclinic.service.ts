import _ from "lodash";
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
        if(!data) return response(res, "not found", 400)
        const { queues } = data
        const totalQueue = (queues.length + 1)
        for (let index = totalQueue ; index < totalQueue + 15 ; index++) {
            const queue = new Queue() 
            queue.status = "EMPTY" as QueueStatus
            queue.sequence = index
            queues.push(queue)
        }
        const totalRegistrant = _.size(_.filter(queues, item => item.status !== "EMPTY" as QueueStatus));
        const result = {...data, totalRegistrant}
        emitEvent(res, polyEvent(id), result)
        return result
    }
}