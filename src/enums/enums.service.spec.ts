import { Test, TestingModule } from '@nestjs/testing';
import { GenderDto } from './dto/gender.dto';
import { EnumsService } from './enums.service';

import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

describe('EnumsService', () => {
  let service: EnumsService;

  const resultAll: GenderDto[] = [
    {
      enum: 'MALE',
      displayValue: 'Male',
    },
    {
      enum: 'FEMALE',
      displayValue: 'Female',
    },
    {
      enum: 'DECLINE_TO_IDENTIFY',
      displayValue: 'Decline To Identify',
    },
    {
      enum: 'UNKNOWN',
      displayValue: 'Unknown',
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EnumsService],
    }).compile();

    service = module.get<EnumsService>(EnumsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getGenderEnum', () => {
    it('should return genders', async () => {
      expect(service.getGenderEnum()[0].enum).toBe(resultAll[0].enum);
    });

    it('should check dto', async () => {
      const genderInfo = { enum: 'TEST', displayValue: 'Test' };
      const genderInfoDto = plainToInstance(GenderDto, genderInfo);
      const errors = await validate(genderInfoDto);
      expect(errors.length).toBe(0);
    });
  });
});
