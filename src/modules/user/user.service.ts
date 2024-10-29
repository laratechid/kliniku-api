import { FindOptionsWhere } from "typeorm";
import { UserDto } from "../../dto/user";
import { User } from "../../entity/user";
import { response } from "../../helper/response";
import { Res } from "../../types/fastify";
import { UserRepository } from "./user.repository";

export class UserService {
    private userRepo: UserRepository
    constructor(userRepo: UserRepository){
        this.userRepo = userRepo
    }

    async createUser(res: Res, dto: UserDto){
        const entity = new User()
        const user = Object.assign(entity, dto)
        return await this.userRepo.createUser(user)
    }

    async getUser(res: Res, id: number){
        const opt: FindOptionsWhere<User> = { id }
        const data = await this.userRepo.fetchUser(opt)
        if(!data) response(res, "user not found", 400)
        return data
    }
}