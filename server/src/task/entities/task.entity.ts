import { ToDoList } from "src/to-do-list/entities/to-do-list.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Task {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;


    @Column()
    description: string;

    @Column()
    completed: boolean;

    @ManyToOne(() => ToDoList, (list) => list.tasks, { nullable: true })
    @JoinColumn({ name: 'toDoListId' })
    list: ToDoList;


    @ManyToOne(() => User, (user) => user.tasks)
    @JoinColumn({ name: 'userId' })
    user: User;
}
