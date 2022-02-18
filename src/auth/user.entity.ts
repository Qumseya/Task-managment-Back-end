/* eslint-disable prettier/prettier */
import { Task } from '../tasks/task.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column({nullable:true})
  firstName: string;

  @Column({nullable:true})
  lastName: string;

  @Column({nullable:true})
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ default: false })
  isDeactivated: boolean;

  @OneToMany((_type) => Task, (task) => task.user, { eager: true })
  tasks: Task[];
}
