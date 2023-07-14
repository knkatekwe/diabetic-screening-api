import { PatientVitalsRequest } from 'src/core/models/requests/patient-vitals.request';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  InternalServerErrorException,
  Param,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PatientVitalService } from './patient-vital.service';
import { PatientVitals } from 'src/core/models/entities/patient-vitals.entity';

@ApiTags('v1/patient-vitals')
@Controller('patient-vital')
export class PatientVitalController {
  constructor(private patientService: PatientVitalService) {}

  @HttpCode(201)
  @Post()
  async create(@Body() createPatient: PatientVitalsRequest) {
    const patient = await this.patientService.create(createPatient);
    if (!patient) {
      return new InternalServerErrorException('Failed to create new patient');
    }
    return { message: 'Patient Vitals successfully created.' };
  }

  @Get('patient/:patientId')
  async findAllPatientVitals(@Param('patientId') patientId: string) {
    const patientVitals: Array<PatientVitals> =
      await this.patientService.findAllByUser(patientId);
    return { payload: patientVitals };
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const patient = await this.patientService.findById(id);
    return { payload: patient };
  }

  // @Put(':id')
  // async update(
  //   @Param('id') id: string,
  //   @Body() updatePatient: PatientVitalsRequest,
  // ) {
  //   const newPatient: any = await this.patientService.update(id, updatePatient);
  //   return { message: 'Patient Vitals updated', payload: newPatient };
  // }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.patientService.delete(id);
    return { message: 'Patient Vitals removed' };
  }
}
