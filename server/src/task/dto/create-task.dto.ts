import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateTaskDto {

    @IsNotEmpty()
    @IsString()
    title: string;

    @IsOptional()
    @IsString()
    description: string;

    @IsBoolean()
    completed: boolean;

    @IsOptional() 
    toDoListId: number;
}
