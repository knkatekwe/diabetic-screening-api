import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { PatientVitals } from './patient-vitals.entity';

@Entity()
export class Patient {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastname: string;

  @Column()
  idNumber: string;

  @Column()
  phoneNumber: string;

  @Column()
  email: string;

  @Column()
  dob: string;

  @Column()
  gender: string;

  @Column()
  streetAddress: string;

  @Column()
  suburb: string;

  @Column()
  city: string;

  @Column()
  province: string;

  @Column()
  country: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @OneToMany(() => PatientVitals, (patientVitals) => patientVitals.patient)
  @JoinColumn()
  patientVitals: PatientVitals[];
}
