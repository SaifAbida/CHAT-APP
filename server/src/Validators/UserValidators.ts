import {
  IsString,
  IsAlphanumeric,
  IsNotEmpty,
  Length,
  IsEmail,
} from "class-validator";

export class RegisterValidators {
  @IsNotEmpty()
  @IsAlphanumeric()
  @Length(5, 20)
  username: string;
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @IsString()
  @Length(5)
  password: string;
}

export class UpdateValidators {
  @IsNotEmpty()
  @IsAlphanumeric()
  @Length(5, 20)
  username: string;
  @IsNotEmpty()
  @IsEmail()
  email: string;
}

export class PasswordResetValidators {
  @IsNotEmpty()
  @IsString()
  @Length(5)
  currentPassword: string;
  @IsNotEmpty()
  @IsString()
  @Length(5)
  newPassword: string;
  @IsNotEmpty()
  @IsString()
  @Length(5)
  confirmPassword: string;
}

export class LoginValidators {
  @IsNotEmpty()
  @IsAlphanumeric()
  @Length(5, 20)
  username: string;
  @IsNotEmpty()
  @IsString()
  @Length(5)
  password: string;
}
