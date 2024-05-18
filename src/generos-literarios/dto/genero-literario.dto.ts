import { ApiPropertyOptional, OmitType, PartialType } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { GeneroLiterario } from '../entities/genero-literario.entity';

export class CrearGeneroLiterarioDto extends OmitType(GeneroLiterario, [
  'id',
] as const) {
  @IsNotEmpty({ message: 'El nombre del género literario es requerido' })
  @IsString({
    message: 'El nombre del género literario debe ser una cadena de texto',
  })
  @MinLength(3, {
    message: 'El nombre del género literario debe tener al menos 3 caracteres',
  })
  @MaxLength(30, {
    message: 'El nombre del género literario debe tener menos de 30 caracteres',
  })
  nom_genero: string;

  @IsNotEmpty({ message: 'La descripción del género literario es requerida' })
  @IsString({
    message: 'La descripción del género literario debe ser una cadena de texto',
  })
  @MinLength(3, {
    message:
      'La descripción del género literario debe tener al menos 3 caracteres',
  })
  @MaxLength(500, {
    message:
      'La descripción del género literario debe tener menos de 500 caracteres',
  })
  descripcion: string;
}

export class ActualizarGeneroLiterarioDto extends PartialType(
  CrearGeneroLiterarioDto,
) {
  @ApiPropertyOptional()
  @IsOptional()
  nom_genero?: string;

  @ApiPropertyOptional()
  @IsOptional()
  descripcion?: string;
}
