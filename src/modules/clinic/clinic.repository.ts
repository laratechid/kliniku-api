import { DataSource, Repository } from "typeorm";
import { Clinic } from "../../entity/clinic";
import { PaginationDto } from "../../dto/pagination.dto";

export class ClinicRepository{
    private clinicRepo : Repository<Clinic>
    constructor(db: DataSource){
        this.clinicRepo = db.getRepository(Clinic)
    }

    getOne(id: number){
        return this.clinicRepo.createQueryBuilder("clinic")
        .where("clinic.id = :id", { id })
        .leftJoinAndSelect("clinic.polyclinics", "polyclinics")
        .leftJoinAndSelect("clinic.schedules", "schedules")
        .leftJoinAndSelect("polyclinics.poly", "poly")
        .getOne()
    }

    getAll({ limit, skip }: PaginationDto){
        return this.clinicRepo.createQueryBuilder("clinic")
        .leftJoinAndSelect("clinic.polyclinics", "polyclinics")
        .leftJoinAndSelect("polyclinics.poly", "poly")
        .take(limit)
        .skip(skip)
        .getManyAndCount()
    }

    updateRating(clinicId: number, rating: number){
        return this.clinicRepo.update(clinicId, { rating })
    }

    isClinicExist(id: number){
        return this.clinicRepo.existsBy({ id })
    }
}