import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
  DeleteDateColumn,
} from "typeorm";
import { PolyClinic } from "./polyclinic";
import { ClinicSchedule } from "./schedule";

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

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: false })
  adress: string;

  @Column({ type: "float", nullable: true })
  rating: number;

  @Column({ nullable: false })
  imageProfile: string;

  @Column({ nullable: true })
  vision: string;

  @CreateDateColumn({ select: false })
  createdAt: Date;

  @UpdateDateColumn({ select: false })
  updatedAt: Date;

  @DeleteDateColumn({ select: false })
  deletedAt: Date;

  @OneToMany(() => PolyClinic, (polyclinic) => polyclinic.clinic)
  polyclinics: PolyClinic[];

  @OneToMany(() => PolyClinic, (polyclinic) => polyclinic.clinic)
  ratings: PolyClinic[];

  @OneToMany(() => ClinicSchedule, (schedule) => schedule.clinic)
  schedules: ClinicSchedule[];
}
