import { IsEnum, isNotEmpty, IsNotEmpty, IsString } from "class-validator"


export class CreateCollaboratorDto {

    @IsNotEmpty()
    @IsString()
    email:string;

    @IsNotEmpty()
    role: 'Admin' | 'Viewer';

    @IsNotEmpty()
    toDoListId: number
}
