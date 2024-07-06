import { Expose } from 'class-transformer';

export class GenderDto {
  @Expose()
  enum: string;

  @Expose()
  displayValue: string;
}
