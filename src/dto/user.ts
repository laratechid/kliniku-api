import { IsEmail, IsNumber, IsPhoneNumber, IsString } from "class-validator"

export class UserDto {
    @IsString()
    name: string

    @IsEmail()
    email: string

    @IsPhoneNumber()
    phone: string

    @IsNumber()
    age: number

    @IsString()
    ktp: string

    @IsString()
    lon: string

    @IsString()
    lat: string
}