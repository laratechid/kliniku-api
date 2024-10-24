import { Entity, Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { Base } from "./base"

@Entity({ name: "user" })
export class User {
    @PrimaryGeneratedColumn("uuid", { name: "id" })
    id: string
    
    @Column()
    name: string

    @Column()
    email: string

    @Column({ nullable: true })
    phone: string

    @Column({ nullable: true })
    age: number

    @Column({ nullable: true })
    ktp: string

    // longitude coordinates
    @Column({ nullable: true })
    lon: string

    // latitude coordinates
    @Column({ nullable: true })
    lat: string

    @CreateDateColumn()
    createdAt: Date
    
    @UpdateDateColumn()
    updatedAt: Date
}