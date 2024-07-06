import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsString,
  IsDate,
  IsPhoneNumber,
  IsOptional,
  IsNotEmpty,
  MaxLength,
  Matches,
  MinLength,
  IsEnum,
  MinDate,
  MaxDate,
  Validate,
} from 'class-validator';
import { GenderEnum } from 'src/enums/enum/genderEnum';
import { MinMaxAge } from '../validators/age-validator';

export class UserDto {
  @IsOptional()
  id: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @MaxLength(100)
  @Matches(/[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}/, {
    message: 'Email is invalid!',
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(100)
  @Matches(
    /(?=.*[A-Z])(?=.*[a-zA-Z].*[a-zA-Z])(?=.*[0-9])(?=.*[-!\“#\$%&‘()*+,./:;<=>?@\\[\\]^_`{|}~\\\\]).*$/,
    {
      message: 'Password too weak!',
    },
  )
  password: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^\p{L}+['\p{L}\p{Zs}-]*$/u, {
    message: 'First name is not valid!',
  })
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^\p{L}+['\p{L}\p{Zs}-]*$/u, {
    message: 'Last name is not valid!',
  })
  lastName: string;

  @IsDate()
  @Transform(({ value }) => new Date(value))
  @MaxDate(new Date())
  @Matches(/^\d{4}(-)(((0)[0-9])|((1)[0-2]))(-)([0-2][0-9]|(3)[0-1])$/i, {
    message: 'Date must be formatted as yyyy-mm-dd',
  })
  @Validate(MinMaxAge)
  dateOfBirth: string;

  @IsNotEmpty()
  @IsString()
  @IsEnum(GenderEnum)
  gender: string;

  @MaxLength(100)
  @IsString()
  address: string;

  @MaxLength(100)
  @IsString()
  city: string;

  @IsString()
  country: string;

  @MaxLength(25)
  @IsPhoneNumber()
  @Matches(
    /^(?=.*[0-9])(\\+)?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*( [a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)*$/,
    {
      message: 'Phone number is not valid!',
    },
  )
  phone: string;
}
