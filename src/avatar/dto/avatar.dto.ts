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
  @ApiProperty()
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
  @ApiPropertyOptional()
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
