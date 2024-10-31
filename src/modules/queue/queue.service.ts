import { response } from "../../helper/response"
import { Res } from "../../types/fastify"
import { QueueRepository } from "./queue.repository"

export class QueueService{
    private queueRepo : QueueRepository
    constructor(queueRepo: QueueRepository){
        this.queueRepo = queueRepo
    }

    async getOne(res: Res, id: number){
        const data = await this.queueRepo.getOne(id)
        if(!data) return response(res, "not found")
        return data
    }
}