import { IsArray, IsNumber, IsOptional, IsString, Max, Min } from "class-validator";

export class ReviewDto{
    @IsNumber()
    clinicId: number

    @IsNumber()
    @Min(1)
    @Max(5)
    rating: number

    @IsOptional()
    @IsString()
    review: string

    @IsOptional()
    @IsArray()
    @IsString()
    reaction: string[]
}