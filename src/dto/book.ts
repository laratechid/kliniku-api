import { Type } from "class-transformer";
import { IsNumber } from "class-validator";

export class BookSummaryRequestDto {
  @IsNumber()
  @Type(() => Number)
  sequence: number;

  @IsNumber()
  @Type(() => Number)
  polyClinicId: number;
}

export class BookQueueDto {
  @IsNumber()
  polyClinicId: number;

  @IsNumber()
  sequence: number;
}
