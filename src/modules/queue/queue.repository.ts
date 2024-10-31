import { DataSource, Repository } from "typeorm";
import { Queue } from "../../entity/queue";

export class QueueRepository{
    private queueRepo : Repository<Queue>
    constructor(db: DataSource){
        this.queueRepo = db.getRepository(Queue)
    }

    getOne(id: number){
        return this.queueRepo.createQueryBuilder("q")
        .where("q.id = :id", { id })
        .leftJoinAndSelect("q.polyClinic","polyClinic")
        .leftJoinAndSelect("polyClinic.clinic", "clinic")
        .getOne()
    }
}