import { ApiProperty } from '@nestjs/swagger';

export class PatientVitalsRequest {
  @ApiProperty()
  weight: number;
  @ApiProperty()
  height: number;
  @ApiProperty()
  bloodGlucoseLevel: number;
  @ApiProperty()
  systolic: number;
  @ApiProperty()
  diastolic: number;
  @ApiProperty()
  patient: string;
}
