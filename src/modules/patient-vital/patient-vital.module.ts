import { PatientVitals } from './../../core/models/entities/patient-vitals.entity';
import { Module } from '@nestjs/common';
import { PatientVitalService } from './patient-vital.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientVitalController } from './patient-vital.controller';
import { PatientModule } from '../patient/patient.module';
import { NotificationModule } from '../notification/notification.module';

@Module({
  imports: [
    PatientModule,
    NotificationModule,
    TypeOrmModule.forFeature([PatientVitals]),
  ],
  exports: [PatientVitalService],
  providers: [PatientVitalService],
  controllers: [PatientVitalController],
})
export class PatientVitalModule {}
