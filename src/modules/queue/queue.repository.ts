import { DataSource, Repository } from "typeorm";
import { Queue } from "../../entity/queue";

export class QueueRepository{
    private queueRepo : Repository<Queue>
    constructor(db: DataSource){
        this.queueRepo = db.getRepository(Queue)
    }
}