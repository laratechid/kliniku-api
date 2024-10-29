import { DataSource } from "typeorm";
import { User } from "../entity/user";
import { env } from "./env";
import { Clinic } from "../entity/clinic";
import { PolyClinic } from "../entity/polyclinic";
import { Poly } from "../entity/poly";
import { Queue } from "../entity/queue";


export const AppDataSource = new DataSource({
    type: "mysql",
    host: env.mysqlHost,
    port: env.mysqlPort,
    username: env.mysqlUser,
    password: env.mysqlPass,
    database: env.mysqlDb,
    synchronize: false,
    logging: true,
    entities: [User, Clinic, PolyClinic, Poly, Queue]
})

export async function mysqlInit() {
    await AppDataSource.initialize()
    return AppDataSource.isInitialized
}

