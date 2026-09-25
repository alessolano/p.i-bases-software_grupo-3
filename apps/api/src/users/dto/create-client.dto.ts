import {
  IsDateString,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  Length,
  Matches,
  Max,
  Min,
} from 'class-validator';
import { UserRole } from '../enums/user-role.enum';
import { CreateUserBaseDto } from './create-user-base.dto';

export class CreateClientDto extends CreateUserBaseDto {
  @IsIn([UserRole.CLIENT], {
    message: 'El rol debe ser cliente.',
  })
  declare role: UserRole.CLIENT;

  @IsOptional()
  @IsString({ message: 'El primer apellido debe ser texto.' })
  firstSurname?: string | null;

  @IsOptional()
  @IsString({ message: 'El segundo apellido debe ser texto.' })
  secondSurname?: string | null;

  @IsOptional()
  @IsDateString(
    { strict: true },
    { message: 'La fecha de nacimiento debe ser una fecha válida.' },
  )
  @Length(10, 10, {
    message: 'La fecha de nacimiento debe tener el formato YYYY-MM-DD.',
  })
  @Matches(/^\d{4}-\d{2}-\d{2}$/u, {
    message: 'La fecha de nacimiento debe tener el formato YYYY-MM-DD.',
  })
  birthday?: string | null;

  @IsOptional()
  @IsString({ message: 'El teléfono debe ser texto.' })
  phoneNumber?: string | null;

  @IsOptional()
  @IsInt({
    message: 'El identificador de la dirección debe ser un número entero.',
  })
  @Min(Number.MIN_SAFE_INTEGER, {
    message: 'El identificador de la dirección está fuera del rango admitido.',
  })
  @Max(Number.MAX_SAFE_INTEGER, {
    message: 'El identificador de la dirección está fuera del rango admitido.',
  })
  addressId?: number | null;
}
