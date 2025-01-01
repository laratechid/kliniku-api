import { targetConstructorToSchema } from "class-validator-jsonschema";
import { UpdateQueueDto } from "../../dto/queue.dto";

const tags = ["Queue"];
export const queueSchema = {
  getOne: { tags },
  update: { tags, body: targetConstructorToSchema(UpdateQueueDto) },
};
