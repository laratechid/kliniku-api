import { IsEnum, IsNumber, IsOptional } from "class-validator";
import { QueueStatus } from "../enum/queue";

export class UpdateQueueDto {
    @IsEnum(QueueStatus)
    status?: QueueStatus;
}

export class CreateQueueDto {
    @IsNumber()
    polyClinicId: number;
}