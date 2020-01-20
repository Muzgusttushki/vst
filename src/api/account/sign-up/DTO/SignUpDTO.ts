import { IsDefined, IsEmail, IsString, IsNotEmpty } from "class-validator";

export class SignUpDTO {
    @IsDefined()
    @IsEmail()
    email: string;

    @IsDefined()
    @IsString()
    @IsNotEmpty()
    password: string;

    @IsDefined()
    @IsString()
    @IsNotEmpty()
    verification: string;
}