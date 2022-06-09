import { IsNotEmpty, MinLength } from 'class-validator';

export class ChangeUsernameDto {
  @IsNotEmpty()
  @MinLength(3)
  username: string;
}
