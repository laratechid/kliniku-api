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
import { PolyClinic } from "./polyclinic";
import { QueueStatus } from "../enum/queue";
import { User } from "./user";

@Entity({ name: "queue" })
export class Queue {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  userId: number;

  @Column()
  polyClinicId: number;

  @Column({ type: "enum", enum: QueueStatus, default: QueueStatus.BOOKED })
  status: QueueStatus;

  @Column()
  sequence: number;

  @CreateDateColumn({ select: false })
  createdAt: Date;

  @UpdateDateColumn({ select: false })
  updatedAt: Date;

  @DeleteDateColumn({ select: false })
  deletedAt: Date;

  @ManyToOne(() => PolyClinic, (polyclinic) => polyclinic.queues)
  @JoinColumn({ name: "polyClinicId" })
  polyClinic: PolyClinic;

  @ManyToOne(() => User, (user) => user.queue)
  @JoinColumn({ name: "userId" })
  user: User;
}
