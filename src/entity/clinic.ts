import { Entity, Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn, OneToMany, DeleteDateColumn, JoinColumn } from "typeorm"
import { PolyClinic } from "./polyclinic";

@Entity({ name: "clinic" })
export class Clinic {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ type: "bool" })
    isVerified: boolean;

    @Column({ nullable: true })
    lon: string;

    @Column({ nullable: true })
    lat: string;

    @Column({ type: "json" })
    images: string[];

    @Column({ type: "json" })
    paymentSupports: string[];

    @CreateDateColumn({ select: false })
    createdAt: Date;

    @UpdateDateColumn({ select: false })
    updatedAt: Date;

    @DeleteDateColumn({ select: false })
    deletedAt: Date;

    @OneToMany(() => PolyClinic, (polyclinic) => polyclinic.clinic)
    polyclinics: PolyClinic[];
}

// export interface Clinic {
//     id: string;
//     name: string;
//     polyclinics: PolyClinic[];
//     images: string[];
//     distance: string;
//     rating: number;
//     isVerified: boolean;
//     openSchedule: string;
//     openDays: string;
//     paymentSupports: string[]
//   }