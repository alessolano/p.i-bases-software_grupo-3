import {
  IsDefined,
  IsEmail,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';

export class CreateUserBaseDto {
  @IsDefined({ message: 'El correo electrónico es obligatorio.' })
  @IsString({ message: 'El correo electrónico debe ser texto.' })
  @IsEmail({}, { message: 'El correo electrónico debe tener un formato válido.' })
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
