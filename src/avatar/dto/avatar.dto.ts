import { ApiPropertyOptional, OmitType, PartialType } from '@nestjs/swagger';
import { $Enums } from '@prisma/client';
import { Transform } from 'class-transformer';
import {
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Avatar } from '../entities/avatar.entity';

export class CrearAvatarDto extends OmitType(Avatar, ['id'] as const) {
  @IsNotEmpty({ message: 'El nombre del avatar es requerido' })
  @IsString({ message: 'El nombre del avatar debe ser una cadena de texto' })
  @MinLength(3, {
    message: 'El nombre del avatar debe tener al menos 3 caracteres',
  })
  @MaxLength(30, {
    message: 'El nombre del avatar no puede tener más de 30 caracteres',
  })
  nom_avatar: string;

  @IsNotEmpty({ message: 'La descripción del avatar es requerida' })
  @IsString({
    message: 'La descripción del avatar debe ser una cadena de texto',
  })
  @MinLength(3, {
    message: 'La descripción del avatar debe tener al menos 3 caracteres',
  })
  @MaxLength(30, {
    message: 'La descripción del avatar no puede tener más de 30 caracteres',
  })
  descripcion: string;

  @IsNotEmpty({ message: 'El rol del avatar es requerido' })
  @IsString({ message: 'El rol del avatar debe ser una cadena de texto' })
  @MinLength(3, {
    message: 'El rol del avatar debe tener al menos 3 caracteres',
  })
  @MaxLength(30, {
    message: 'El rol del avatar no puede tener más de 30 caracteres',
  })
  @IsIn(Object.values($Enums.Rol), {
    message: `El rol del avatar debe ser uno de los siguientes valores: ${Object.values(
      $Enums.Rol,
    ).join(', ')}`,
  })
  @Transform(({ value: rol }) => rol.toUpperCase())
  rol: $Enums.Rol;
}

export class ActualizarAvatarDto extends PartialType(CrearAvatarDto) {
  @ApiPropertyOptional()
  @IsOptional()
  nom_avatar?: string;

  @ApiPropertyOptional()
  @IsOptional()
  descripcion?: string;

  @ApiPropertyOptional()
  @IsOptional()
  rol?: $Enums.Rol;
}
