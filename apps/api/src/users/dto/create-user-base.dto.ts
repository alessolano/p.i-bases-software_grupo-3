import {
  IsDefined,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';
import { UserRole } from '../enums/user-role.enum';

export class CreateUserBaseDto {
  @IsDefined({ message: 'El rol es obligatorio.' })
  @IsEnum(UserRole, {
    message: 'El rol debe ser administrador, empleado o cliente.',
  })
  role: UserRole;

  @IsDefined({ message: 'El correo electrónico es obligatorio.' })
  @IsString({ message: 'El correo electrónico debe ser texto.' })
  @IsEmail(
    {},
    { message: 'El correo electrónico debe tener un formato válido.' },
  )
  email: string;

  @IsDefined({ message: 'El primer nombre es obligatorio.' })
  @IsString({ message: 'El primer nombre debe ser texto.' })
  @Matches(/\S/u, {
    message: 'El primer nombre no puede estar vacío ni contener solo espacios.',
  })
  firstName: string;

  @IsOptional()
  @IsString({ message: 'El segundo nombre debe ser texto.' })
  secondName?: string | null;
}
