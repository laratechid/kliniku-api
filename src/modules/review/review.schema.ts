import { targetConstructorToSchema } from "class-validator-jsonschema";
import { ReviewDto } from "../../dto/review.dto";

const tags = ["Review"]
export const reviewSchema = {
    create: { tags, body: targetConstructorToSchema(ReviewDto) }
}