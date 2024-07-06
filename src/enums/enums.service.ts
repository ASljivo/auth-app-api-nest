import { Injectable } from '@nestjs/common';
import { GenderDto } from './dto/gender.dto';
import { GenderEnum } from './enum/genderEnum';

@Injectable()
export class EnumsService {
  getGenderEnum(): GenderDto[] {
    const mapEnumToObjetc = (): GenderDto[] => {
      const genderObject: GenderDto[] = [];
      for (const key in GenderEnum) {
        if (GenderEnum.hasOwnProperty(key)) {
          genderObject.push({ enum: key, displayValue: GenderEnum[key] });
        }
      }
      return genderObject;
    };

    return mapEnumToObjetc();
  }
}
