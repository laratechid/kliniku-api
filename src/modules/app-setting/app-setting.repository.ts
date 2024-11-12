import { DataSource, Repository } from "typeorm";
import { AppSetting } from "../../entity/app-setting";

export class AppSettingRepository{
    private appSettingRepo: Repository<AppSetting>
    constructor(db: DataSource){
        this.appSettingRepo = db.getRepository(AppSetting)
    }

    fetchOneByKey(key: string){
        return this.appSettingRepo.findOne({ where: { key } })
    }
}