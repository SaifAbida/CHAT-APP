import {
  IsString,
  IsAlphanumeric,
  IsNotEmpty,
  Length,
  IsEmail,
} from "class-validator";
import { Document } from "mongoose";

export class userValidators extends Document {
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
