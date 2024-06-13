import { ApiPropertyOptional, OmitType, PartialType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';
import { Respuesta } from '../entities/respuesta.entity';

export class CrearRespuestaDto extends OmitType(Respuesta, ['id'] as const) {
  @IsNotEmpty({ message: 'La respuesta es requerida' })
  @IsString({ message: 'La respuesta debe ser una cadena de texto' })
  @Length(1, 1, { message: 'La respuesta debe tener 1 caracter' })
  respuesta: string;

  @IsNotEmpty({ message: 'El id de la pregunta es requerido' })
  @IsInt({ message: 'El id de la pregunta debe ser un número entero' })
  @Min(1, { message: 'El id de la pregunta debe ser mayor o igual a 1' })
  @Max(4294967295, {
    message: 'El id de la pregunta debe ser menor o igual a 4294967295', // 2^32 - 1 = 4.294.967.295
  })
  @Transform(({ value: id_pregunta }) => parseInt(id_pregunta))
  id_pregunta: number;

  @IsNotEmpty({ message: 'El id del cuestionario es requerido' })
  @IsInt({ message: 'El id del cuestionario debe ser un número entero' })
  @Min(1, { message: 'El id del cuestionario debe ser mayor o igual a 1' })
  @Max(4294967295, {
    message: 'El id del cuestionario debe ser menor o igual a 4294967295', // 2^32 - 1 = 4.294.967.295
  })
  @Transform(({ value: id_cuestionario }) => parseInt(id_cuestionario))
  id_cuestionario: number;
}

export class ActualizarRespuestaDto extends PartialType(CrearRespuestaDto) {
  @ApiPropertyOptional()
  @IsOptional()
  respuesta?: string;

  @ApiPropertyOptional()
  @IsOptional()
  id_pregunta?: number;

  @ApiPropertyOptional()
  @IsOptional()
  id_cuestionario?: number;
}
