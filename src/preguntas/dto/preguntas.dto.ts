import { ApiPropertyOptional, OmitType, PartialType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { Pregunta } from '../entities/pregunta.entity';

export class CrearPreguntaDto extends OmitType(Pregunta, ['id'] as const) {
  @IsNotEmpty({ message: 'La pregunta es requerida' })
  @IsString({ message: 'La pregunta debe ser una cadena de texto' })
  @MinLength(10, { message: 'La pregunta debe tener al menos 10 caracteres' })
  @MaxLength(200, { message: 'La pregunta debe tener menos de 200 caracteres' })
  pregunta: string;

  @IsNotEmpty({ message: 'El id de libro es requerido' })
  @IsInt({ message: 'El id de libro debe ser un número entero' })
  @Min(1, { message: 'El id de libro debe ser mayor o igual a 1' })
  @Max(4294967295, {
    message: 'El id de libro debe ser menor o igual a 4294967295', // 2^32 - 1 = 4.294.967.295
  })
  @Transform(({ value: id_libro }) => parseInt(id_libro))
  id_libro: number;

  @IsOptional()
  @IsNotEmpty({ message: 'El id del cuestionario es requerido' })
  @IsInt({ message: 'El id del cuestionario debe ser un número entero' })
  @Min(1, { message: 'El id del cuestionario debe ser mayor o igual a 1' })
  @Max(4294967295, {
    message: 'El id del cuestionario debe ser menor o igual a 4294967295',
  })
  @Transform(({ value: id_cuestionario }) => parseInt(id_cuestionario))
  id_cuestionario: number;
}

export class ActualizarPreguntaDto extends PartialType(CrearPreguntaDto) {
  @ApiPropertyOptional()
  @IsOptional()
  pregunta?: string;

  @ApiPropertyOptional()
  @IsOptional()
  id_libro?: number;
}
