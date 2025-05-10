import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Task } from 'src/task/entities/task.entity';
import { Collaborator } from 'src/collaborator/entities/collaborator.entity';

@Entity()
export class ToDoList {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    title: string;
    @Column()
    description: string;
    @ManyToOne(() => User, (user) => user.ownedLists)
    @JoinColumn({ name: 'owner_id' })
    owner: User;
    @OneToMany(() => Task, (task) => task.list, { cascade: true })
    tasks: Task[];

    @OneToMany(() => Collaborator, (collab) => collab.list)
    collaborators: Collaborator[];
}
