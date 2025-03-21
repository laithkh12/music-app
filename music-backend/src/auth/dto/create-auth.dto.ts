import { IsOptional, IsString } from 'class-validator';

export class CreateAuthDto {
  @IsString()
  username: string;
  @IsString()
  name: string;
  @IsString()
  password: string;
  @IsOptional()
  profilePicture: string;
}
