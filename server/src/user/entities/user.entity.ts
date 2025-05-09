import { Collaborator } from "src/collaborator/entities/collaborator.entity";
import { Task } from "src/task/entities/task.entity";
import { ToDoList } from "src/to-do-list/entities/to-do-list.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @OneToMany(() => ToDoList, (list) => list.owner)
    ownedLists: ToDoList[];

    @OneToMany(() => Collaborator, (collab) => collab.user)
    collaborations: Collaborator[];

    @OneToMany(() => Task, (task) => task.user)
    tasks: Task[];
}
