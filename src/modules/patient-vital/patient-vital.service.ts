import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PatientVitals } from 'src/core/models/entities/patient-vitals.entity';
import { PatientVitalsRequest } from 'src/core/models/requests/patient-vitals.request';
import { Repository } from 'typeorm';
import { PatientService } from '../patient/patient.service';
import { NotificationService } from '../notification/notification.service';

@Injectable()
export class PatientVitalService {
  constructor(
    @InjectRepository(PatientVitals)
    private patientRepository: Repository<PatientVitals>,
    private readonly patientService: PatientService,
    private readonly notificationService: NotificationService,
  ) {}

  async create(payload: PatientVitalsRequest): Promise<PatientVitals> {
    const patient = await this.patientService.findById(payload.patient);
    const bloodPressureCategory = this.calculateBlooPressureCategory(
      payload.systolic,
      payload.diastolic,
    );
    const patientBMI = this.calculateBMI(payload.height, payload.weight);
    console.log(`Patient BMI`, patientBMI);

    const patientBMIStatus = this.determineBMIStatus(patientBMI);

    const bloodGlucoseCategory = this.determineBloodGlucoseCategory(
      payload.bloodGlucoseLevel,
    );

    const patientVitals = await this.patientRepository.save(
      this.patientRepository.create({
        ...payload,
        bloodGlucoseCategory: bloodGlucoseCategory,
        patientBMI: patientBMI,
        patientBMIStatus: patientBMIStatus,
        bloodPressureCategory: bloodPressureCategory,
        patient: patient,
      }),
    );

    // this.sendNotification(patientVitals);

    // check patient vitals and record notification
    if (
      patientVitals.bloodPressureCategory != 'NORMAL' ||
      patientVitals.bloodGlucoseCategory != 'Normal' ||
      patientVitals.patientBMIStatus != 'Healthy'
    ) {
      // send the message
      this.sendNotification(patientVitals);
    }
    return patientVitals;
  }

  async findAll(): Promise<PatientVitals[]> {
    return this.patientRepository.find();
  }

  async findAllByUser(id: string): Promise<PatientVitals[]> {
    return this.patientRepository.find({ where: { patient: { id } } });
  }

  async findById(id: string): Promise<PatientVitals> {
    return this.patientRepository.findOne({ where: { id } });
  }

  async update(id: string, data: any): Promise<any> {
    return this.patientRepository
      .createQueryBuilder()
      .update()
      .set({ ...data })
      .where('id = :id', { id })
      .execute();
  }

  async delete(id: string): Promise<any> {
    return this.patientRepository
      .createQueryBuilder()
      .delete()
      .from(PatientVitals)
      .where('id = :id', { id })
      .execute();
  }

  async sendNotification(patientVitals: PatientVitals) {
    const patient = `${patientVitals.patient.firstName} ${patientVitals.patient.lastname} (${patientVitals.patient.idNumber})`;
    const message = `Blood Glucose Category: ${patientVitals.bloodGlucoseCategory} | Blood Pressure category: ${patientVitals.bloodGlucoseCategory} | BMI Status: ${patientVitals.patientBMIStatus}`;
    await this.notificationService.create({
      content: message,
      title: `${patient}`,
      priority: 'Attention',
    });
  }

  determineBloodGlucoseCategory(glucodeLevel: number): string {
    if (glucodeLevel <= 140) {
      return 'Normal';
    }
    if (glucodeLevel > 140 && glucodeLevel < 200) {
      return 'Prediabetes';
    }
    if (glucodeLevel >= 200) {
      return 'Diabetes';
    }
  }

  determineBMIStatus(patientBMI: number): string {
    if (patientBMI < 18.5) {
      return 'Underweight';
    }
    if (patientBMI >= 18.5 && patientBMI <= 24.9) {
      return 'Healthy';
    }
    if (patientBMI >= 25 && patientBMI <= 29.9) {
      return 'Overweight';
    }
    if (patientBMI >= 30) {
      return 'Obese';
    }
  }

  calculateBMI(height: number, weight: number): number {
    const result = (weight / ((height * height) / 10000)).toFixed(2);
    return Number(result);
  }

  calculateBlooPressureCategory(systolic: number, diastolic: number): string {
    if (systolic < 120 && diastolic < 80) {
      return 'NORMAL';
    }

    if ((systolic >= 120 || systolic <= 129) && diastolic < 80) {
      return 'ELEVATED';
    }

    if (
      (systolic >= 130 && systolic <= 139) ||
      (diastolic >= 80 && diastolic <= 89)
    ) {
      return 'HIGH BLOOD PRESSURE (HYPERTENSION) STAGE 1';
    }

    if (systolic >= 140 || diastolic >= 90) {
      return 'HIGH BLOOD PRESSURE (HYPERTENSION) STAGE 2';
    }

    if (systolic > 180 || diastolic > 120) {
      return 'HYPERTENSIVE CRISIS';
    }

    return null;
  }
}
