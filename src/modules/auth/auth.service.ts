import { LoginDto } from "../../dto/auth"
import { UserDto } from "../../dto/user"
import { User } from "../../entity/user"
import { RegisterOpt } from "../../enum/auth"
import { comparePassword, hashPassword } from "../../helper/bcrypt"
import { response } from "../../helper/response"
import { generateUUID } from "../../helper/uuid"
import { Res } from "../../types/fastify"
import { UserRepository } from "../user/user.repository"

export class AuthService {
    private userRepo: UserRepository
    constructor(userRepo: UserRepository) {
        this.userRepo = userRepo
    }

    async register(res: Res, dto: UserDto){
        const { email, password } = dto
        const isEmailExist = await this.userRepo.fetchUser({ email })
        if(isEmailExist) response(res, "email was registered", 400)
        const hashed = await hashPassword(password)
        dto.password = hashed
        const entity = new User()
        entity.registerOpt = RegisterOpt.APP
        const user = Object.assign(entity, {...dto, identifier: generateUUID()})
        try {
            const registeredUser = await this.userRepo.createUser(user)
            return registeredUser
        } catch (error) {
            response(res, error, 500)
        }
    }

    async login(res: Res, dto: LoginDto){
        const { email, password } = dto
        const user = await this.userRepo.fetchUser({ email })
        const isPasswordMatch = await comparePassword(password, user.password)
        if(!isPasswordMatch) response(res, "incorrect password", 403)
        return user
    }
}