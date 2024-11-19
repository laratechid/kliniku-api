import { IsEmail, IsString, IsStrongPassword, MinLength } from "class-validator"

export class LoginDto {
    @IsEmail()
    email: string

    @IsString()
    @MinLength(8)
    password: string
}