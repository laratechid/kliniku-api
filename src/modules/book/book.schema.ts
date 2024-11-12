import { targetConstructorToSchema } from "class-validator-jsonschema";
import { BookSummaryRequestDto } from "../../dto/book";

const tags = ["Book"]
export const bookSchema = {
    bookSummary: { tags, querystring: targetConstructorToSchema(BookSummaryRequestDto) }
}