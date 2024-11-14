import _ from "lodash";
import { polyEvent } from "../../const/event";
import { Queue } from "../../entity/queue";
import { QueueStatus } from "../../enum/queue";
import { response } from "../../helper/response";
import { emitEvent } from "../../service/socket.io";
import { Res } from "../../types/fastify";
import { PolyClinicRepository } from "./polyclinic.repository";
import { getMissingSequence } from "../../helper/sort";

export class PolyClinicService {
    private polyClinicRepo: PolyClinicRepository
    constructor(polyClinicRepository: PolyClinicRepository) {
        this.polyClinicRepo = polyClinicRepository
    }

    async getDetail(res: Res, id: number) {
        const data = await this.polyClinicRepo.getDetail(id)
        if (!data) return response(res, "not found", 400)
        let { queues } = data

        if (queues.length > 0) {
            const sequenceCollections: number[] = []
            queues.forEach(res => sequenceCollections.push(res.sequence))
            const missingSequence = getMissingSequence(sequenceCollections)
            missingSequence.forEach(res => {
                const queue = new Queue() 
                queue.status = "EMPTY" as QueueStatus
                queue.sequence = res
                queues.push(queue)
            })
            queues = _.sortBy(queues, 'sequence');
        }

        const totalRegistrant = _.size(_.filter(queues, item => item.status !== "EMPTY" as QueueStatus));
        const result = { ...data, queues, totalRegistrant }
        emitEvent(res, polyEvent(id), result)
        return result
    }
}