import { DataSource } from "typeorm";
import { User } from "../entity/user";
import { env } from "./env";


export const AppDataSource = new DataSource({
    type: "mysql",
    host: env.mysqlHost,
    port: env.mysqlPort,
    username: env.mysqlUser,
    password: env.mysqlPass,
    database: env.mysqlDb,
    synchronize: true,
    logging: false,
    entities: [User]
})

export async function mysqlInit() {
    await AppDataSource.initialize()
    return AppDataSource.isInitialized
}

