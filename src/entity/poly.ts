import { Entity, Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn, ManyToOne, JoinColumn, DeleteDateColumn, OneToMany, OneToOne } from "typeorm"
import { ClinicPoly } from "./clinic-poly"

@Entity({ name: "poly" })
export class Poly {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    image: string;

    @CreateDateColumn({ select: false })
    createdAt: Date;

    @UpdateDateColumn({ select: false })
    updatedAt: Date;

    @DeleteDateColumn({ select: false })
    deletedAt: Date;

    @OneToOne(() => ClinicPoly, (clinicPoly) => clinicPoly.poly)
    clinicPolys: ClinicPoly[];
}