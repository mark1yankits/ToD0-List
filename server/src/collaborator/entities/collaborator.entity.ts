import { ToDoList } from "src/to-do-list/entities/to-do-list.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


export type Role = 'Admin' | 'Viewer';

@Entity()
export class Collaborator {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.collaborations)
    user: User;

    @ManyToOne(() => ToDoList, (list) => list.collaborators)
    list: ToDoList;

    @Column()
    role: Role;
}
