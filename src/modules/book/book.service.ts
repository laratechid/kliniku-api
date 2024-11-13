import dayjs from "dayjs";
import { BookQueueDto, BookSummaryRequestDto } from "../../dto/book";
import { Queue } from "../../entity/queue";
import { AppSettingKey } from "../../enum/app-setting";
import { response } from "../../helper/response";
import { Res } from "../../types/fastify";
import { AppSettingRepository } from "../app-setting/app-setting.repository";
import { PolyClinicRepository } from "../polyclinic/polyclinic.repository";
import { PolyClinicService } from "../polyclinic/polyclinic.service";
import { QueueRepository } from "../queue/queue.repository";
import { Between } from "typeorm";

export class BookService {
    private polyclinicRepo: PolyClinicRepository
    private appSettingRepo: AppSettingRepository
    private queueRepo: QueueRepository
    private polyClinicService: PolyClinicService
    constructor(polyclinicRepo: PolyClinicRepository, appSettingRepo: AppSettingRepository, queueRepo: QueueRepository, polyClinicService: PolyClinicService) {
        this.polyclinicRepo = polyclinicRepo
        this.appSettingRepo = appSettingRepo
        this.queueRepo = queueRepo
        this.polyClinicService = polyClinicService
    }

    async bookSummary(res: Res, { polyClinicId, sequence }: BookSummaryRequestDto) {
        const poly = await this.polyclinicRepo.fetchOne(polyClinicId)
        const [{ value: bookingFee }, { value: platformFee }] = await Promise.all([
            this.appSettingRepo.fetchOneByKey(AppSettingKey.BOOKING_FEE),
            this.appSettingRepo.fetchOneByKey(AppSettingKey.PLATFORM_FEE)
        ]);
        if (!bookingFee || !platformFee) {
            return response(res, "fee not found")
        }
        const grandTotal = +bookingFee + +platformFee;
        return { ...poly, bookingFee, platformFee, grandTotal };
    }

    async bookQueue(res: Res, dto: BookQueueDto, userId: number) {
        const startDate = dayjs().startOf("day").toDate()
        const endDate = dayjs().endOf("day").toDate()
        const { polyClinicId, sequence } = dto

        let sequenceIncremet: number = sequence
        let queueAvailable: boolean = false
        let emptySequence: number = 0

        while (queueAvailable == false) {
            const isQueueAvailable = await this.queueRepo.isExist({
                where: { polyClinicId, sequence: sequenceIncremet, createdAt: Between(startDate, endDate) }
            })
            if (isQueueAvailable) sequenceIncremet++
            if (!isQueueAvailable) { queueAvailable = true; emptySequence = sequenceIncremet; }
        }
        const entity = new Queue()
        entity.userId = userId
        entity.sequence = emptySequence
        entity.polyClinicId = polyClinicId
        const data = await this.queueRepo.create(entity)
        if (!data) return response(res, "not found")
        await this.polyClinicService.getDetail(res, polyClinicId)
        return data
    }
}