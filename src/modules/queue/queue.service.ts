import { CreateQueueDto, UpdateQueueDto } from "../../dto/queue.dto"
import { Queue } from "../../entity/queue"
import { response } from "../../helper/response"
import { Res } from "../../types/fastify"
import { PolyClinicService } from "../polyclinic/polyclinic.service"
import { QueueRepository } from "./queue.repository"

export class QueueService{
    private queueRepo : QueueRepository
    private poliClinicService : PolyClinicService
    constructor(queueRepo: QueueRepository, poliClinicService: PolyClinicService){
        this.queueRepo = queueRepo
        this.poliClinicService = poliClinicService
    }

    async getOne(res: Res, id: number){
        const data = await this.queueRepo.getOne(id)
        if(!data) return response(res, "not found")
        return data
    }

    async update(res: Res, dto: UpdateQueueDto, queueId: number){
        const fetch = await this.queueRepo.getOne(queueId)
        if(!fetch) return response(res, "not found")
        const data = await this.queueRepo.update(queueId, dto)
        await this.poliClinicService.getDetail(res, fetch.polyClinicId)
        return data
    }

    async create(res: Res, dto: CreateQueueDto, userId: number){
        const { polyClinicId } = dto
        const latestQueue = await this.queueRepo.getLatestQueue(polyClinicId)
        const increment = !latestQueue ? 1 : latestQueue.sequence + 1 
        const entity = new Queue()
        entity.userId = userId
        entity.sequence = increment
        entity.polyClinicId = polyClinicId
        const queue = Object.assign(entity, dto)
        const data = await this.queueRepo.create(queue)
        if(!data) return response(res, "not found")
        await this.poliClinicService.getDetail(res, polyClinicId)
        return data
    }
}