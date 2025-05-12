import {IsNotEmpty, IsString } from "class-validator"


export class CreateCollaboratorDto {

    @IsNotEmpty()
    @IsString()
    email:string;



    @IsNotEmpty()
    toDoListId: number
}
