import {
  IsEmail,
  IsString,
  IsStrongPassword,
  MinLength,
} from "class-validator";

export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;
}

export class GoogleRegisterDto {
  @IsString()
  idToken: string;
}

export class RefreshTokenDto {
  @IsString()
  refreshToken: string;
}
