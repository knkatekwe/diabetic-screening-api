import { Test, TestingModule } from '@nestjs/testing';
import { PatientVitalService } from './patient-vital.service';

describe('PatientVitalService', () => {
  let service: PatientVitalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PatientVitalService],
    }).compile();

    service = module.get<PatientVitalService>(PatientVitalService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
