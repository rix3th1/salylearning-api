import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Avatar } from '@prisma/client';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CrearAvatarDto implements Partial<Avatar> {
  @ApiProperty({
    title: 'Nombre del avatar',
    description: 'Nombre del avatar',
    example: 'Avatar 1',
    minLength: 3,
    maxLength: 30,
  })
  @IsNotEmpty({ message: 'El nombre del avatar es requerido' })
  @IsString({ message: 'El nombre del avatar debe ser una cadena de texto' })
  @MinLength(3, {
    message: 'El nombre del avatar debe tener al menos 3 caracteres',
  })
  @MaxLength(30, {
    message: 'El nombre del avatar no puede tener más de 30 caracteres',
  })
  nom_avatar: string;
}

export class ActualizarAvatarDto implements Partial<Avatar> {
  @ApiPropertyOptional({
    title: 'Nombre del avatar',
    description: 'Nombre del avatar',
    example: 'Avatar 1',
    minLength: 3,
    maxLength: 30,
  })
  @IsOptional()
  @IsString({ message: 'El nombre del avatar debe ser una cadena de texto' })
  @MinLength(3, {
    message: 'El nombre del avatar debe tener al menos 3 caracteres',
  })
  @MaxLength(30, {
    message: 'El nombre del avatar no puede tener más de 30 caracteres',
  })
  nom_avatar?: string;
}
