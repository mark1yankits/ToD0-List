import { forwardRef } from '@nestjs/common';
import { ToDoList } from "src/to-do-list/entities/to-do-list.entity";
import { User, UserRole } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";




@Entity()
export class Collaborator {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.collaborations, { nullable: false })
    user: User;

    @ManyToOne(() => ToDoList, (list) => list.collaborators)
    list: ToDoList;
}

