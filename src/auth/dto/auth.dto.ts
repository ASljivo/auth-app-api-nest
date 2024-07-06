import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class LoginDto {
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
}
