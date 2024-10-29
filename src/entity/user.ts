import { Entity, Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm"

@Entity({ name: "user" })
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    
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

    @Column({ nullable: true })
    lon: string

    @Column({ nullable: true })
    lat: string

    @CreateDateColumn({ select: false })
    createdAt: Date
    
    @UpdateDateColumn({ select: false })
    updatedAt: Date

    @DeleteDateColumn({ select: false })
    deletedAt: Date
}