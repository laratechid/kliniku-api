import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  DeleteDateColumn,
  OneToMany,
  OneToOne,
} from "typeorm";
import { Clinic } from "./clinic";

@Entity({ name: "review" })
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ select: false })
  clinicId: number;

  @Column({ nullable: false })
  rating: number;

  @Column({ nullable: true })
  review: string;

  @Column({ type: "json", nullable: true })
  reaction: string[];

  @CreateDateColumn({ select: false })
  createdAt: Date;

  @UpdateDateColumn({ select: false })
  updatedAt: Date;

  @DeleteDateColumn({ select: false })
  deletedAt: Date;

  @ManyToOne(() => Clinic, (clinic) => clinic.ratings)
  @JoinColumn({ name: "clinicId" })
  clinic: Clinic;
}
