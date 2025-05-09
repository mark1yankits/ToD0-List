import { Collaborator } from "src/collaborator/entities/collaborator.entity";
import { Task } from "src/task/entities/task.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ToDoList {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @ManyToOne(() => User, (user) => user.ownedLists)
    @JoinColumn({name: 'user_id'})
    owner: User;

    @OneToMany(() => Task, (task) => task.list, { cascade: true })
    tasks: Task[];

    @OneToMany(() => Collaborator, (collab) => collab.list)
    collaborators: Collaborator[];
}
