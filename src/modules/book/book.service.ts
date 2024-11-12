import { BookSummaryRequestDto } from "../../dto/book";
import { AppSettingKey } from "../../enum/app-setting";
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
        const { value: bookingFee} = await this.appSettingRepo.fetchOneByKey(AppSettingKey.BOOKING_FEE)
        const { value: platformFee} = await this.appSettingRepo.fetchOneByKey(AppSettingKey.PLATFORM_FEE)
        const grandTotal = ( +bookingFee + +platformFee )
        return {...poly, bookingFee, platformFee, grandTotal}
    }
}