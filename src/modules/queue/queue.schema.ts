import { targetConstructorToSchema } from "class-validator-jsonschema";
import { CreateQueueDto, UpdateQueueDto } from "../../dto/queue.dto";

const tags = ["Queue"]
export const queueSchema = {
    getOne: { tags },
    create: { tags, body: targetConstructorToSchema(CreateQueueDto) },
    update: { tags, body: targetConstructorToSchema(UpdateQueueDto) }
}