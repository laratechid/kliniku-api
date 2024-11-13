import { BookSummaryRequestDto } from "../../dto/book";
import { AppSettingKey } from "../../enum/app-setting";
import { response } from "../../helper/response";
import { Res } from "../../types/fastify";
import { AppSettingRepository } from "../app-setting/app-setting.repository";
import { PolyClinicRepository } from "../polyclinic/polyclinic.repository";

export class BookService{
    private polyclinicRepo: PolyClinicRepository
    private appSettingRepo: AppSettingRepository
    constructor(polyclinicRepo: PolyClinicRepository, appSettingRepo: AppSettingRepository){
        this.polyclinicRepo = polyclinicRepo
        this.appSettingRepo = appSettingRepo
    } 
    async bookSummary(res: Res, { polyclinicId, sequence }: BookSummaryRequestDto){
        const poly = await this.polyclinicRepo.fetchOne(polyclinicId)
        const [ { value: bookingFee }, { value: platformFee } ] = await Promise.all([
            this.appSettingRepo.fetchOneByKey(AppSettingKey.BOOKING_FEE),
            this.appSettingRepo.fetchOneByKey(AppSettingKey.PLATFORM_FEE)
        ]);
        if (!bookingFee || !platformFee){
            return response(res, "fee not found")
        }
        const grandTotal = +bookingFee + +platformFee;
        return { ...poly, bookingFee, platformFee, grandTotal };
    }
}