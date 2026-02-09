import {
  // IsIn,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class AddTodoDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(25)
  @MinLength(6, { message: 'le nom doit faire au moins 6 caractères' })
  name!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(25)
  description!: string;

  // @IsIn(['ouvert', 'en cours', 'terminé'])
  // status: string;
}
