import { DataSource, Repository } from "typeorm";
import { Review } from "../../entity/review";

export class ReviewRepository {
  private reviewRepo: Repository<Review>;
  constructor(db: DataSource) {
    this.reviewRepo = db.getRepository(Review);
  }

  create(entity: Review) {
    return this.reviewRepo.save(entity);
  }

  getClinicRatings(clinicId: number) {
    return this.reviewRepo.find({ where: { clinicId }, select: ["rating"] });
  }
}
