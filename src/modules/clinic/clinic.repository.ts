import { DataSource, Repository } from "typeorm";
import { Clinic } from "../../entity/clinic";

export class ClinicRepository{
    private clinicRepo : Repository<Clinic>
    constructor(db: DataSource){
        this.clinicRepo = db.getRepository(Clinic)
    }

    getOne(id: number){
        return this.clinicRepo.createQueryBuilder("clinic")
        .where("clinic.id = :id", { id })
        .leftJoinAndSelect("clinic.clinicPolys", "clinicPolys")
        .leftJoinAndSelect("clinicPolys.poly", "poly")
        .leftJoinAndSelect("clinicPolys.queues", "queues")
        .getOne()
    }

    getAll(){
        return this.clinicRepo.findAndCount()
    }
}