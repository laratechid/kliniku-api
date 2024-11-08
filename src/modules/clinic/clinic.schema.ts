import { targetConstructorToSchema } from "class-validator-jsonschema";
import { PaginationDto } from "../../dto/pagination.dto";

const tags = ["Clinic"]
export const clinicSchema = {
    getOne: { tags },
    getAll: { tags, querystring: targetConstructorToSchema(PaginationDto) }
}