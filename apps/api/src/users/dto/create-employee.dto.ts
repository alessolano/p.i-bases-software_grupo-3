import {
  IsDateString,
  IsDefined,
  IsIn,
  IsInt,
  IsString,
  Length,
  Matches,
  Max,
  Min,
} from 'class-validator';
import { UserRole } from '../enums/user-role.enum';
import { CreateUserBaseDto } from './create-user-base.dto';

export class CreateEmployeeDto extends CreateUserBaseDto {
  @IsIn([UserRole.ADMIN, UserRole.EMPLOYEE], {
    message: 'El rol debe ser administrador o empleado.',
  })
  declare role: UserRole.ADMIN | UserRole.EMPLOYEE;

  @IsDefined({ message: 'El primer apellido es obligatorio.' })
  @IsString({ message: 'El primer apellido debe ser texto.' })
  @Matches(/\S/u, {
    message:
      'El primer apellido no puede estar vacío ni contener solo espacios.',
  })
  firstSurname: string;

  @IsDefined({ message: 'El segundo apellido es obligatorio.' })
  @IsString({ message: 'El segundo apellido debe ser texto.' })
  @Matches(/\S/u, {
    message:
      'El segundo apellido no puede estar vacío ni contener solo espacios.',
  })
  secondSurname: string;

  @IsDefined({ message: 'La fecha de nacimiento es obligatoria.' })
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
  birthday: string;

  @IsDefined({ message: 'El teléfono es obligatorio.' })
  @IsString({ message: 'El teléfono debe ser texto.' })
  @Matches(/\S/u, {
    message: 'El teléfono no puede estar vacío ni contener solo espacios.',
  })
  phoneNumber: string;

  @IsDefined({ message: 'El identificador de la dirección es obligatorio.' })
  @IsInt({
    message: 'El identificador de la dirección debe ser un número entero.',
  })
  @Min(Number.MIN_SAFE_INTEGER, {
    message: 'El identificador de la dirección está fuera del rango admitido.',
  })
  @Max(Number.MAX_SAFE_INTEGER, {
    message: 'El identificador de la dirección está fuera del rango admitido.',
  })
  addressId: number;

  @IsDefined({ message: 'El identificador de la sucursal es obligatorio.' })
  @IsInt({
    message: 'El identificador de la sucursal debe ser un número entero.',
  })
  @Min(Number.MIN_SAFE_INTEGER, {
    message: 'El identificador de la sucursal está fuera del rango admitido.',
  })
  @Max(Number.MAX_SAFE_INTEGER, {
    message: 'El identificador de la sucursal está fuera del rango admitido.',
  })
  branchId: number;
}
