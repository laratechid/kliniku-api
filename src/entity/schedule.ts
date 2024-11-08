import { Entity, Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn, ManyToOne, JoinColumn, DeleteDateColumn } from "typeorm"
import { Clinic } from "./clinic";
import { Day } from "../enum/schedule";

@Entity({ name: "clinic_schedule" })
export class ClinicSchedule {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ select: false })
    clinicId: number

    @Column({ type: "enum", enum: Day })
    day: Day

    @Column({ nullable: false, length: 5 })
    startTime: string

    @Column({ nullable: false, length: 5 })
    endTime: string

    @CreateDateColumn({ select: false })
    createdAt: Date;

    @UpdateDateColumn({ select: false })
    updatedAt: Date;

    @DeleteDateColumn({ select: false })
    deletedAt: Date;

    @ManyToOne(() => Clinic, (clinic) => clinic.schedules)
    @JoinColumn({ name: 'clinicId' })
    clinic: Clinic;
}