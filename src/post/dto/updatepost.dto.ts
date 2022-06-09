import { IsNotEmpty } from 'class-validator';

export class UpdatePostDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  text: string;
}
