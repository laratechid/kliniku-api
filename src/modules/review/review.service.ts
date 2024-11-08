import { ReviewDto } from "../../dto/review.dto"
import { Review } from "../../entity/review"
import { calculateAverageRating } from "../../helper/calculator"
import { Res } from "../../types/fastify"
import { ClinicRepository } from "../clinic/clinic.repository"
import { ReviewRepository } from "./review.repository"

export class ReviewService{
    private reviewRepo : ReviewRepository
    private clinicRepo : ClinicRepository
    constructor(reviewRepo: ReviewRepository, clinicRepo: ClinicRepository){
        this.reviewRepo = reviewRepo
        this.clinicRepo = clinicRepo
    }

    async create(_: Res, dto: ReviewDto){
        const entity = new Review()
        const review = Object.assign(entity, dto)
        const { clinicId } = review
        await this.reviewRepo.create(review)
        const getRatings = await this.reviewRepo.getClinicRatings(clinicId) 
        const rating = calculateAverageRating(getRatings)
        this.clinicRepo.updateRating(
            clinicId,
            rating
        )
        return "ok"
    }
}