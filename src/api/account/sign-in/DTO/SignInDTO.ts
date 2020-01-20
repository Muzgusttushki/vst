import { IsEmail, IsDefined, IsNotEmpty, IsString, Length } from "class-validator";

export class SignInDTO {
    @IsDefined()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsDefined()
    @IsString()
    @IsNotEmpty()
    @Length(8, 36)
    password: string;

    @IsDefined()
    @IsString()
    @IsNotEmpty()
    verification: string;
}