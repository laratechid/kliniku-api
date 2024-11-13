import { targetConstructorToSchema } from "class-validator-jsonschema";
import { BookQueueDto, BookSummaryRequestDto } from "../../dto/book";

const tags = ["Book"]
export const bookSchema = {
    bookSummary: { tags, querystring: targetConstructorToSchema(BookSummaryRequestDto) },
    bookQueue: { tags, body: targetConstructorToSchema(BookQueueDto) },
}