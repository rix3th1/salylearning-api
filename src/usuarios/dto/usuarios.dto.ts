import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Usuario } from '@prisma/client';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CrearUsuarioDto implements Partial<Usuario> {
  @ApiProperty()
  @IsNotEmpty({ message: 'El nombre de usuario es requerido' })
  @IsString({ message: 'El nombre de usuario debe ser una cadena de texto' })
  @MinLength(4, {
    message: 'El nombre de usuario debe tener al menos 4 caracteres',
  })
  @MaxLength(50, {
    message: 'El nombre de usuario debe tener menos de 50 caracteres',
  })
  username: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El primer nombre es requerido' })
  @IsString({ message: 'El primer nombre debe ser una cadena de texto' })
  @MinLength(3, {
    message: 'El primer nombre debe tener al menos 3 caracteres',
  })
  @MaxLength(30, {
    message: 'El primer nombre debe tener menos de 30 caracteres',
  })
  p_nombre: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: 'El segundo nombre debe ser una cadena de texto' })
  @MinLength(3, {
    message: 'El segundo nombre debe tener al menos 3 caracteres',
  })
  @MaxLength(30, {
    message: 'El segundo nombre debe tener menos de 30 caracteres',
  })
  s_nombre?: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El primer apellido es requerido' })
  @IsString({ message: 'El primer apellido debe ser una cadena de texto' })
  @MinLength(3, {
    message: 'El primer apellido debe tener al menos 3 caracteres',
  })
  @MaxLength(30, {
    message: 'El primer apellido debe tener menos de 30 caracteres',
  })
  p_apellido: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: 'El segundo apellido debe ser una cadena de texto' })
  @MinLength(3, {
    message: 'El segundo apellido debe tener al menos 3 caracteres',
  })
  @MaxLength(30, {
    message: 'El segundo apellido debe tener menos de 30 caracteres',
  })
  s_apellido?: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El email es requerido' })
  @IsString({ message: 'El email debe ser una cadena de texto' })
  @MinLength(5, { message: 'El email debe tener al menos 5 caracteres' })
  @MaxLength(100, { message: 'El email debe tener menos de 100 caracteres' })
  @IsEmail(undefined, { message: 'El email no es válido' })
  email: string;

  @ApiProperty()
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

export class ActualizarUsuarioDto implements Partial<Usuario> {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: 'El nombre de usuario debe ser una cadena de texto' })
  @MinLength(4, {
    message: 'El nombre de usuario debe tener al menos 4 caracteres',
  })
  @MaxLength(50, {
    message: 'El nombre de usuario debe tener menos de 50 caracteres',
  })
  username?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: 'El primer nombre debe ser una cadena de texto' })
  @MinLength(3, {
    message: 'El primer nombre debe tener al menos 3 caracteres',
  })
  @MaxLength(30, {
    message: 'El primer nombre debe tener menos de 30 caracteres',
  })
  p_nombre?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsOptional()
  @IsString({ message: 'El segundo nombre debe ser una cadena de texto' })
  @MinLength(3, {
    message: 'El segundo nombre debe tener al menos 3 caracteres',
  })
  @MaxLength(30, {
    message: 'El segundo nombre debe tener menos de 30 caracteres',
  })
  s_nombre?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: 'El primer apellido debe ser una cadena de texto' })
  @MinLength(3, {
    message: 'El primer apellido debe tener al menos 3 caracteres',
  })
  @MaxLength(30, {
    message: 'El primer apellido debe tener menos de 30 caracteres',
  })
  p_apellido?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsOptional()
  @IsString({ message: 'El segundo apellido debe ser una cadena de texto' })
  @MinLength(3, {
    message: 'El segundo apellido debe tener al menos 3 caracteres',
  })
  @MaxLength(30, {
    message: 'El segundo apellido debe tener menos de 30 caracteres',
  })
  s_apellido?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: 'El email debe ser una cadena de texto' })
  @MinLength(5, { message: 'El email debe tener al menos 5 caracteres' })
  @MaxLength(100, { message: 'El email debe tener menos de 100 caracteres' })
  @IsEmail(undefined, { message: 'El email no es válido' })
  email?: string;

  @ApiPropertyOptional()
  @IsOptional()
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
  password?: string;
}
