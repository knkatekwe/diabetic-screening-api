import { ApiProperty } from '@nestjs/swagger';

export class PatientRequest {
  @ApiProperty()
  firstName: string;
  @ApiProperty()
  lastname: string;
  @ApiProperty()
  phoneNumber: string;
  @ApiProperty()
  idNumber: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  streetAddress: string;
  @ApiProperty()
  suburb: string;
  @ApiProperty()
  city: string;
  @ApiProperty()
  province: string;
  @ApiProperty()
  country: string;
  @ApiProperty()
  dob: string;
  @ApiProperty()
  gender: string;
}
