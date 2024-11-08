import { DataSource } from "typeorm";
import { User } from "../entity/user";
import { env } from "./env";
import { Clinic } from "../entity/clinic";
import { PolyClinic } from "../entity/polyclinic";
import { Poly } from "../entity/poly";
import { Queue } from "../entity/queue";
import { infoLog } from "../helper/logger";
import { Review } from "../entity/review";
import { ClinicSchedule } from "../entity/schedule";


export const AppDataSource = new DataSource({
    type: "mysql",
    host: env.mysqlHost,
    port: env.mysqlPort,
    username: env.mysqlUser,
    password: env.mysqlPass,
    database: env.mysqlDb,
    synchronize: true,
    logging: false,
    entities: [User, Clinic, PolyClinic, Poly, Queue, Review, ClinicSchedule]
})

export async function mysqlInit() {
    await AppDataSource.initialize()
    const isConnected=  AppDataSource.isInitialized
    if (!isConnected) process.exit()
        infoLog(`is database connected ? ${isConnected}`)
}

