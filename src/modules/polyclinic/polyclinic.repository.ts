import { DataSource, Repository } from "typeorm";
import { PolyClinic } from "../../entity/polyclinic";
import dayjs from "dayjs";

export class PolyClinicRepository {
  private polyClinicRepo: Repository<PolyClinic>;
  constructor(db: DataSource) {
    this.polyClinicRepo = db.getRepository(PolyClinic);
  }

  getDetail(id: number) {
    const startDate = dayjs().startOf("day").format("YYYY-MM-DD HH:mm:ss");
    const endDate = dayjs().endOf("day").format("YYYY-MM-DD HH:mm:ss");
    return this.polyClinicRepo
      .createQueryBuilder("polyClinic")
      .leftJoinAndSelect("polyClinic.poly", "poly")
      .leftJoinAndSelect(
        "polyClinic.queues",
        "queue",
        "queue.createdAt BETWEEN :startDate AND :endDate",
        { startDate, endDate },
      )
      .where("polyClinic.id = :id", { id })
      .getOne();
  }

  fetchOne(id: number) {
    return this.polyClinicRepo
      .createQueryBuilder("polyClinic")
      .where("polyClinic.id = :id", { id })
      .leftJoinAndSelect("polyClinic.clinic", "clinic")
      .leftJoinAndSelect("polyClinic.poly", "poly")
      .getOne();
  }
}
