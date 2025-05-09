import { IsEmail, IsString, MinLength } from "class-validator";

export class CreateUserDto {

    @IsString()
    @MinLength(4, { message: 'Password must be more than 4 symbols' })
    name: string
    
    @IsEmail()
    email:string

    @MinLength(8, { message: 'Password must be more than 8 symbols' })
    password: string;
}
