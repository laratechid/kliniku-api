import { Entity, Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn, ManyToOne, JoinColumn, DeleteDateColumn, OneToOne, OneToMany } from "typeorm"
import { Clinic } from "./clinic"
import { Poly } from "./poly"
import { Queue } from "./queue";

@Entity({ name: "clinic_poly" })
export class ClinicPoly {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ select: false })
    clinicId: number

    @Column({ select: false })
    polyId: number

    @CreateDateColumn({ select: false })
    createdAt: Date;

    @UpdateDateColumn({ select: false })
    updatedAt: Date;

    @DeleteDateColumn({ select: false })
    deletedAt: Date;

    @ManyToOne(() => Clinic, (clinic) => clinic.clinicPolys)
    @JoinColumn({ name: 'clinicId' })
    clinic: Clinic;

    @OneToOne(() => Poly, (poly) => poly.clinicPolys)
    @JoinColumn({ name: 'polyId' })
    poly: Poly;

    @OneToMany(() => Queue, (polyclinic) => polyclinic.polyClinic)
    queues: Queue[]
}