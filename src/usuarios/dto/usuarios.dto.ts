import { ApiPropertyOptional, OmitType, PartialType } from '@nestjs/swagger';
import {
  IsDate,
  IsDateString,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { Usuario } from '../entities/usuario.entity';

export class CrearUsuarioDto extends OmitType(Usuario, ['id'] as const) {
  @IsNotEmpty({ message: 'El nombre de usuario es requerido' })
  @IsString({ message: 'El nombre de usuario debe ser una cadena de texto' })
  @MinLength(4, {
    message: 'El nombre de usuario debe tener al menos 4 caracteres',
  })
  @MaxLength(50, {
    message: 'El nombre de usuario debe tener menos de 50 caracteres',
  })
  username: string;

  @IsNotEmpty({ message: 'El primer nombre es requerido' })
  @IsString({ message: 'El primer nombre debe ser una cadena de texto' })
  @MinLength(3, {
    message: 'El primer nombre debe tener al menos 3 caracteres',
  })
  @MaxLength(30, {
    message: 'El primer nombre debe tener menos de 30 caracteres',
  })
  p_nombre: string;

  @IsOptional()
  @IsString({ message: 'El segundo nombre debe ser una cadena de texto' })
  @MinLength(3, {
    message: 'El segundo nombre debe tener al menos 3 caracteres',
  })
  @MaxLength(30, {
    message: 'El segundo nombre debe tener menos de 30 caracteres',
  })
  s_nombre?: string;

  @IsNotEmpty({ message: 'El primer apellido es requerido' })
  @IsString({ message: 'El primer apellido debe ser una cadena de texto' })
  @MinLength(3, {
    message: 'El primer apellido debe tener al menos 3 caracteres',
  })
  @MaxLength(30, {
    message: 'El primer apellido debe tener menos de 30 caracteres',
  })
  p_apellido: string;

  @IsOptional()
  @IsString({ message: 'El segundo apellido debe ser una cadena de texto' })
  @MinLength(3, {
    message: 'El segundo apellido debe tener al menos 3 caracteres',
  })
  @MaxLength(30, {
    message: 'El segundo apellido debe tener menos de 30 caracteres',
  })
  s_apellido?: string;

  @IsNotEmpty({ message: 'La edad es requerida' })
  @IsInt({ message: 'La edad debe ser un número entero' })
  @Min(0, { message: 'La edad debe ser mayor o igual a 0' })
  @Max(100, { message: 'La edad debe ser menor o igual a 100' })
  edad: number;

  @IsOptional()
  @IsString({ message: 'La fecha de nacimiento debe ser una cadena de texto' })
  @IsDateString(undefined, {
    message: 'La fecha de nacimiento debe tener el formato YYYY-MM-DD',
  })
  fecha_nacimiento?: Date;

  @IsOptional()
  @IsString({ message: 'La ciudad debe ser una cadena de texto' })
  @MinLength(3, { message: 'La ciudad debe tener al menos 3 caracteres' })
  @MaxLength(50, { message: 'La ciudad debe tener menos de 50 caracteres' })
  ciudad?: string;

  @IsNotEmpty({ message: 'El email es requerido' })
  @IsString({ message: 'El email debe ser una cadena de texto' })
  @MinLength(5, { message: 'El email debe tener al menos 5 caracteres' })
  @MaxLength(100, { message: 'El email debe tener menos de 100 caracteres' })
  @IsEmail(undefined, { message: 'El email no es válido' })
  email: string;

  @IsNotEmpty({ message: 'La contraseña es requerida' })
  @IsString({ message: 'La contraseña debe ser una cadena de texto' })
  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minNumbers: 1,
      minSymbols: 1,
      minUppercase: 1,
    },
    {
      message:
        'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un símbolo',
    },
  )
  password: string;
}

export class ActualizarUsuarioDto extends PartialType(CrearUsuarioDto) {
  @ApiPropertyOptional()
  @IsOptional()
  username?: string;

  @ApiPropertyOptional()
  @IsOptional()
  p_nombre?: string;

  @ApiPropertyOptional()
  @IsOptional()
  p_apellido?: string;

  @ApiPropertyOptional()
  @IsOptional()
  edad?: number;

  @ApiPropertyOptional()
  @IsOptional()
  email?: string;

  @ApiPropertyOptional()
  @IsOptional()
  password?: string;
}
