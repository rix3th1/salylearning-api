import { ApiProperty, ApiPropertyOptional, ApiTags } from '@nestjs/swagger';
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
  @ApiProperty({
    title: 'Nombre de usuario',
    description: 'Nombre de usuario para el registro',
    example: 'johndoe',
    minLength: 4,
    maxLength: 50,
  })
  @IsNotEmpty({ message: 'El nombre de usuario es requerido' })
  @IsString({ message: 'El nombre de usuario debe ser una cadena de texto' })
  @MinLength(4, {
    message: 'El nombre de usuario debe tener al menos 4 caracteres',
  })
  @MaxLength(50, {
    message: 'El nombre de usuario debe tener menos de 50 caracteres',
  })
  username: string;

  @ApiProperty({
    title: 'Primer nombre',
    description: 'Primer nombre del usuario',
    example: 'John',
    minLength: 3,
    maxLength: 30,
  })
  @IsNotEmpty({ message: 'El primer nombre es requerido' })
  @IsString({ message: 'El primer nombre debe ser una cadena de texto' })
  @MinLength(3, {
    message: 'El primer nombre debe tener al menos 3 caracteres',
  })
  @MaxLength(30, {
    message: 'El primer nombre debe tener menos de 30 caracteres',
  })
  p_nombre: string;

  @ApiPropertyOptional({
    title: 'Segundo nombre',
    description: 'Segundo nombre del usuario (Opcional)',
    example: 'James',
    minLength: 3,
    maxLength: 30,
  })
  @IsOptional()
  @IsString({ message: 'El segundo nombre debe ser una cadena de texto' })
  @MinLength(3, {
    message: 'El segundo nombre debe tener al menos 3 caracteres',
  })
  @MaxLength(30, {
    message: 'El segundo nombre debe tener menos de 30 caracteres',
  })
  s_nombre?: string;

  @ApiProperty({
    title: 'Primer apellido',
    description: 'Primer apellido del usuario',
    example: 'Doe',
    minLength: 3,
    maxLength: 30,
  })
  @IsNotEmpty({ message: 'El primer apellido es requerido' })
  @IsString({ message: 'El primer apellido debe ser una cadena de texto' })
  @MinLength(3, {
    message: 'El primer apellido debe tener al menos 3 caracteres',
  })
  @MaxLength(30, {
    message: 'El primer apellido debe tener menos de 30 caracteres',
  })
  p_apellido: string;

  @ApiPropertyOptional({
    title: 'Segundo apellido',
    description: 'Segundo apellido del usuario (Opcional)',
    example: 'Smith',
    minLength: 3,
    maxLength: 30,
  })
  @IsOptional()
  @IsString({ message: 'El segundo apellido debe ser una cadena de texto' })
  @MinLength(3, {
    message: 'El segundo apellido debe tener al menos 3 caracteres',
  })
  @MaxLength(30, {
    message: 'El segundo apellido debe tener menos de 30 caracteres',
  })
  s_apellido?: string;

  @ApiProperty({
    title: 'Email',
    description: 'Email del usuario',
    example: 'johndoe@example.com',
    minLength: 5,
    maxLength: 100,
  })
  @IsNotEmpty({ message: 'El email es requerido' })
  @IsString({ message: 'El email debe ser una cadena de texto' })
  @MinLength(5, { message: 'El email debe tener al menos 5 caracteres' })
  @MaxLength(100, { message: 'El email debe tener menos de 100 caracteres' })
  @IsEmail(undefined, { message: 'El email no es válido' })
  email: string;

  @ApiProperty({
    title: 'Contraseña',
    description: 'Contraseña del usuario',
    example: 'Password123!',
    minLength: 8,
    maxLength: 50,
  })
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
  @ApiPropertyOptional({
    title: 'Nombre de usuario',
    description: 'Nombre de usuario para el registro',
    example: 'johndoe',
    minLength: 4,
    maxLength: 50,
  })
  @IsOptional()
  @IsString({ message: 'El nombre de usuario debe ser una cadena de texto' })
  @MinLength(4, {
    message: 'El nombre de usuario debe tener al menos 4 caracteres',
  })
  @MaxLength(50, {
    message: 'El nombre de usuario debe tener menos de 50 caracteres',
  })
  username?: string;

  @ApiPropertyOptional({
    title: 'Primer nombre',
    description: 'Primer nombre del usuario',
    example: 'John',
    minLength: 3,
    maxLength: 30,
  })
  @IsOptional()
  @IsString({ message: 'El primer nombre debe ser una cadena de texto' })
  @MinLength(3, {
    message: 'El primer nombre debe tener al menos 3 caracteres',
  })
  @MaxLength(30, {
    message: 'El primer nombre debe tener menos de 30 caracteres',
  })
  p_nombre?: string;

  @ApiPropertyOptional({
    title: 'Segundo nombre',
    description: 'Segundo nombre del usuario',
    example: 'James',
    minLength: 3,
    maxLength: 30,
  })
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

  @ApiPropertyOptional({
    title: 'Primer apellido',
    description: 'Primer apellido del usuario',
    example: 'Doe',
    minLength: 3,
    maxLength: 30,
  })
  @IsOptional()
  @IsString({ message: 'El primer apellido debe ser una cadena de texto' })
  @MinLength(3, {
    message: 'El primer apellido debe tener al menos 3 caracteres',
  })
  @MaxLength(30, {
    message: 'El primer apellido debe tener menos de 30 caracteres',
  })
  p_apellido?: string;

  @ApiPropertyOptional({
    title: 'Segundo apellido',
    description: 'Segundo apellido del usuario',
    example: 'Smith',
    minLength: 3,
    maxLength: 30,
  })
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

  @ApiPropertyOptional({
    title: 'Email',
    description: 'Email del usuario',
    example: 'johndoe@example.com',
    minLength: 5,
    maxLength: 100,
  })
  @IsOptional()
  @IsString({ message: 'El email debe ser una cadena de texto' })
  @MinLength(5, { message: 'El email debe tener al menos 5 caracteres' })
  @MaxLength(100, { message: 'El email debe tener menos de 100 caracteres' })
  @IsEmail(undefined, { message: 'El email no es válido' })
  email?: string;

  @ApiPropertyOptional({
    title: 'Contraseña',
    description: 'Contraseña del usuario',
    example: 'Password123!',
    minLength: 8,
    maxLength: 50,
  })
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
