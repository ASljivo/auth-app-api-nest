import { Test } from '@nestjs/testing';
import { EnumsController } from './enums.controller';
import { EnumsModule } from './enums.module';
import { EnumsService } from './enums.service';

describe('EnumsModule', () => {
  it('should compile the module', async () => {
    const module = await Test.createTestingModule({
      imports: [EnumsModule],
    }).compile();

    expect(module).toBeDefined();
    expect(module.get(EnumsService)).toBeInstanceOf(EnumsService);
    expect(module.get(EnumsController)).toBeInstanceOf(EnumsController);
  });
});
