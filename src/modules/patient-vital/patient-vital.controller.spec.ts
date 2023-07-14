import { Test, TestingModule } from '@nestjs/testing';
import { PatientVitalController } from './patient-vital.controller';

describe('PatientVitalController', () => {
  let controller: PatientVitalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PatientVitalController],
    }).compile();

    controller = module.get<PatientVitalController>(PatientVitalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
