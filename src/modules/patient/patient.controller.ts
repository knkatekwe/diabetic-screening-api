import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  InternalServerErrorException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PatientService } from './patient.service';
import { PatientRequest } from 'src/core/models/requests/patient.request';
import { Patient } from 'src/core/models/entities/patient.entity';

@ApiTags('v1/patients')
@Controller('patients')
export class PatientController {
  constructor(private patientService: PatientService) {}

  @HttpCode(201)
  @Post()
  async create(@Body() createPatient: PatientRequest) {
    const patient = await this.patientService.create(createPatient);
    if (!patient) {
      return new InternalServerErrorException('Failed to create new patient');
    }
    return { message: 'Patient successfully created.' };
  }

  @Get()
  async findAll() {
    const currencies: Array<Patient> = await this.patientService.findAll();
    return { payload: currencies };
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const patient = await this.patientService.findById(id);
    return { payload: patient };
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updatePatient: PatientRequest) {
    const newPatient: any = await this.patientService.update(id, updatePatient);
    return { message: 'Patient updated', payload: newPatient };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.patientService.delete(id);
    return { message: 'Patient removed' };
  }
}
