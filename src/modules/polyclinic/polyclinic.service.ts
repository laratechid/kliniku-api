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
        if (!data) response(res, "not found", 400)
        let { queues } = data

        if (queues.length > 0) {
            const sequenceCollections: number[] = []
            queues.forEach(({ sequence }) => sequenceCollections.push(sequence))
            const missingSequence = getMissingSequence(sequenceCollections)
            missingSequence.forEach(res => {
                const queue = new Queue() 
                queue.status = "EMPTY" as QueueStatus
                queue.sequence = res
                queues.push(queue)
            })
            queues = _.sortBy(queues, 'sequence');
        }
        const totalQ = queues.length
        for (let i = (totalQ + 1); i <= (totalQ + 10); i++) {
            const queue = new Queue() 
            queue.status = "EMPTY" as QueueStatus
            queue.sequence = i
            queues.push(queue)
        }
        const totalRegistrant = _.size(_.filter(queues, item => item.status !== "EMPTY" as QueueStatus));
        const result = { ...data, queues, totalRegistrant }
        emitEvent(res, polyEvent(id), result)
        return result
    }
}