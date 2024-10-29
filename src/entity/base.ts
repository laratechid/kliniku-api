import { CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

export abstract class Base {
    @PrimaryGeneratedColumn()
    id: number
    
    @CreateDateColumn({ select: false })
    createdAt: Date
    
    @UpdateDateColumn({ select: false })
    updatedAt: Date

    @DeleteDateColumn({ select: false })
    deletedAt: Date
}