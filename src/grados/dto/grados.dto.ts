import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Grado } from '@prisma/client';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CrearGradoDto implements Partial<Grado> {
  @ApiProperty({
    title: 'Nombre del grado',
    description: 'Nombre del grado a crear',
    example: 'Primaria',
    minLength: 3,
    maxLength: 30,
  })
  @IsNotEmpty({ message: 'El nombre del grado es requerido' })
  @IsString({ message: 'El nombre del grado debe ser una cadena de texto' })
  @MinLength(3, {
    message: 'El nombre del grado debe tener al menos 3 caracteres',
  })
  @MaxLength(30, {
    message: 'El nombre del grado no puede tener más de 30 caracteres',
  })
  nom_grado: string;
}

export class ActualizarGradoDto implements Partial<Grado> {
  @ApiPropertyOptional({
    title: 'Nombre del grado',
    description: 'Nombre del grado a actualizar',
    example: 'Secundaria',
    minLength: 3,
    maxLength: 30,
  })
  @IsOptional()
  @IsString({ message: 'El nombre del grado debe ser una cadena de texto' })
  @MinLength(3, {
    message: 'El nombre del grado debe tener al menos 3 caracteres',
  })
  @MaxLength(30, {
    message: 'El nombre del grado no puede tener más de 30 caracteres',
  })
  nom_grado?: string;
}
