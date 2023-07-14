import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Patient } from 'src/core/models/entities/patient.entity';
import { PatientRequest } from 'src/core/models/requests/patient.request';
import { Repository } from 'typeorm';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient)
    private patientRepository: Repository<Patient>,
  ) {}

  async create(patient: PatientRequest): Promise<Patient> {
    return this.patientRepository.save(this.patientRepository.create(patient));
  }

  async findAll(): Promise<Patient[]> {
    return this.patientRepository.find();
  }

  async findById(id: string): Promise<Patient> {
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
      .from(Patient)
      .where('id = :id', { id })
      .execute();
  }
}
