import { Controller, Get } from '@nestjs/common';
import { EnumsService } from './enums.service';

@Controller('enums')
export class EnumsController {
  constructor(private enumsService: EnumsService) {}

  @Get('')
  allEnums() {
    return this.enumsService.getGenderEnum();
  }

  @Get('genderEnum')
  genderEnum() {
    return this.enumsService.getGenderEnum();
  }
}
