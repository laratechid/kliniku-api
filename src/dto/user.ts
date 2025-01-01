import {
  IsEmail,
  IsNumber,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
} from "class-validator";

export class UserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsPhoneNumber()
  phone: string;

  @IsStrongPassword({ minLength: 8, minNumbers: 1 })
  password: string;

  // @IsNumber()
  // age: number

  // @IsString()
  // ktp: string

  // @IsString()
  // lon: string

  // @IsString()
  // lat: string
}
