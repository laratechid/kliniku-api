import { Entity, Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn, ManyToOne, JoinColumn, DeleteDateColumn, OneToMany, OneToOne } from "typeorm"
import { ClinicPoly } from "./clinic-poly"
import { QueueStatus } from "../enum/queue";

@Entity({ name: "queue" })
export class Queue {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    userId: number;

    @Column()
    polyClinicId: number;

    @Column({ type: "enum", enum: QueueStatus, default: QueueStatus.EMPTY })
    status: QueueStatus;

    @Column()
    sequence: number;

    @CreateDateColumn({ select: false })
    createdAt: Date;

    @UpdateDateColumn({ select: false })
    updatedAt: Date;

    @DeleteDateColumn({ select: false })
    deletedAt: Date;

    @ManyToOne(() => ClinicPoly, (polyClinic) => polyClinic.queues)
    @JoinColumn({ name: 'polyClinicId' })
    polyClinic: ClinicPoly;
}