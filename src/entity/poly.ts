import { Entity, Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn, ManyToOne, JoinColumn, DeleteDateColumn, OneToMany, OneToOne } from "typeorm"
import { PolyClinic } from "./polyclinic"

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

    @OneToMany(() => PolyClinic, (polyclinic) => polyclinic.poly)
    polyclinics: PolyClinic[];
}