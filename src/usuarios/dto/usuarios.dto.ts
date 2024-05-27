import { ApiPropertyOptional, OmitType, PartialType } from '@nestjs/swagger';
import { $Enums } from '@prisma/client';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsIn,
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
  @IsNotEmpty({ message: 'El segundo nombre no puede estar vacío' })
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
  @IsNotEmpty({ message: 'El segundo apellido no puede estar vacío' })
  @IsString({ message: 'El segundo apellido debe ser una cadena de texto' })
  @MinLength(3, {
    message: 'El segundo apellido debe tener al menos 3 caracteres',
  })
  @MaxLength(30, {
    message: 'El segundo apellido debe tener menos de 30 caracteres',
  })
  s_apellido?: string;

  @IsOptional()
  @IsNotEmpty({ message: 'La edad no puede estar vacía' })
  @IsInt({ message: 'La edad debe ser un número entero' })
  @Min(1, { message: 'La edad debe ser mayor o igual a 1' })
  @Max(100, { message: 'La edad debe ser menor o igual a 100' })
  @Transform(({ value: edad }) => parseInt(edad))
  edad?: number;

  @IsOptional()
  @IsDate({ message: 'La fecha de nacimiento debe ser una fecha' })
  @Transform(({ value: fecha_nacimiento }) =>
    fecha_nacimiento ? new Date(fecha_nacimiento) : null,
  )
  fecha_nacimiento?: Date;

  @IsOptional()
  @IsNotEmpty({ message: 'La ciudad no puede estar vacía' })
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

  @IsOptional()
  @IsNotEmpty({ message: 'El rol no puede estar vacío' })
  @IsString({ message: 'El rol debe ser una cadena de texto' })
  @MinLength(3, { message: 'El rol debe tener al menos 3 caracteres' })
  @MaxLength(30, { message: 'El rol debe tener menos de 30 caracteres' })
  @IsIn(Object.values($Enums.Rol), {
    message: `El rol debe ser uno de los siguientes valores: ${Object.values($Enums.Rol).join(', ')}`,
  })
  @Transform(({ value: rol }) => rol.toUpperCase())
  rol?: $Enums.Rol;

  @IsOptional()
  @IsNotEmpty({
    message:
      'La propiedad que indica si se usará un avatar no puede estar vacía',
  })
  @IsBoolean({
    message:
      'La propiedad que indica si se usará un avatar debe ser un booleano',
  })
  use_avatar?: boolean;

  @IsOptional()
  @IsNotEmpty({ message: 'El usuario verificado no puede estar vacío' })
  @IsBoolean({ message: 'El usuario verificado debe ser un booleano' })
  verificado?: boolean;
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
  email?: string;

  @ApiPropertyOptional()
  @IsOptional()
  password?: string;
}
