import { DataSource } from "typeorm";
import { User } from "../entity/user";
import { env } from "./env";
import { Clinic } from "../entity/clinic";
import { ClinicPoly } from "../entity/clinic-poly";
import { Poly } from "../entity/poly";
import { Queue } from "../entity/queue";


export const AppDataSource = new DataSource({
    type: "mysql",
    host: env.mysqlHost,
    port: env.mysqlPort,
    username: env.mysqlUser,
    password: env.mysqlPass,
    database: env.mysqlDb,
    synchronize: true,
    logging: true,
    entities: [User, Clinic, ClinicPoly, Poly, Queue]
})

export async function mysqlInit() {
    await AppDataSource.initialize()
    return AppDataSource.isInitialized
}

