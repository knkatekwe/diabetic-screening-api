import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Patient } from './patient.entity';

@Entity()
export class PatientVitals {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  weight: number;

  @Column()
  height: number;

  @Column()
  bloodGlucoseLevel: number;

  @Column()
  bloodGlucoseCategory: string;

  @Column()
  systolic: number;

  @Column()
  diastolic: number;

  @Column()
  bloodPressureCategory: string;

  @Column()
  patientBMI: number;

  @Column()
  patientBMIStatus: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @ManyToOne(() => Patient, (patient) => patient.patientVitals)
  @JoinColumn()
  patient: Patient;
}
