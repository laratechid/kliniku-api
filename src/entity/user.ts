import { Entity, Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn, DeleteDateColumn, OneToMany } from "typeorm"
import { Queue } from "./queue";

@Entity({ name: "user" })
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({ type: "text" })
    identifier: string

    @Column()
    name: string

    @Column()
    email: string

    @Column()
    password: string

    @Column({ nullable: true })
    phone: string

    @Column({ nullable: true })
    age: number

    @Column({ nullable: true })
    ktp: string

    @CreateDateColumn({ select: false })
    createdAt: Date
    
    @UpdateDateColumn({ select: false })
    updatedAt: Date

    @DeleteDateColumn({ select: false })
    deletedAt: Date

    @OneToMany(() => Queue, (queue) => queue.user)
    queue: Queue[];
}