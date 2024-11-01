import { Between, DataSource, Repository } from "typeorm";
import { Queue } from "../../entity/queue";
import { QueueStatus } from "../../enum/queue";
import { UpdateQueueDto } from "../../dto/queue.dto";
import dayjs from "dayjs";

export class QueueRepository {
    private queueRepo: Repository<Queue>
    constructor(db: DataSource) {
        this.queueRepo = db.getRepository(Queue)
    }

    fetchOne(id: number, status: QueueStatus) {
        return this.queueRepo.findOne({ where: { id, status } })
    }

    create(entity: Queue) {
        return this.queueRepo.save(entity)
    }

    update(id: number, dto: UpdateQueueDto) {
        return this.queueRepo.update({ id }, dto)
    }

    getOne(id: number) {
        return this.queueRepo.createQueryBuilder("q")
            .where("q.id = :id", { id })
            .leftJoinAndSelect("q.polyClinic", "polyClinic")
            .leftJoin("polyClinic.clinic", "clinic")
            .addSelect(["clinic.id", "clinic.name"])
            .getOne()
    }

    getLatestQueue(polyClinicId: number){
        const startDate = dayjs().startOf("day").toDate()
        const endDate = dayjs().endOf("day").toDate()
        return this.queueRepo.findOne({ where: { polyClinicId, createdAt: Between(startDate, endDate) }, order: { sequence: "DESC" } })
    }
}