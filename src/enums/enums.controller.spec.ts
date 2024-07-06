import { Test, TestingModule } from '@nestjs/testing';
import { EnumsController } from './enums.controller';
import { EnumsService } from './enums.service';

describe('EnumsController', () => {
  let controller: EnumsController;
  let enumService: EnumsService;

  const resultAll = [{ enum: 'TEST', displayValue: 'Test' }];

  const mockEnumService = {
    getGenderEnum: () => resultAll,
  };

  const enumServiceProvider = {
    provide: EnumsService,
    useValue: mockEnumService,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EnumsController],
      providers: [enumServiceProvider],
    }).compile();

    controller = module.get<EnumsController>(EnumsController);
    enumService = module.get<EnumsService>(EnumsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getGenderEnum', () => {
    it('should return genders', async () => {
      jest
        .spyOn(enumService, 'getGenderEnum')
        .mockImplementation(() => resultAll);

      expect(controller.genderEnum()).toBe(resultAll);
    });
  });
});
