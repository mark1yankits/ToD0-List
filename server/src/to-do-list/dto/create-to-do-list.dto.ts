import { IsNotEmpty, IsString } from "class-validator";

export class CreateToDoListDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    description: string;
}
