import { ApiPropertyOptional, OmitType, PartialType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { OpcionRespuesta } from '../entities/opcion-respuesta.entity';

export class CrearOpcionRespuestaDto extends OmitType(OpcionRespuesta, [
  'id',
] as const) {
  @IsNotEmpty({ message: 'La opción de respuesta es requerida' })
  @IsString({ message: 'La opción de respuesta debe ser una cadena de texto' })
  @Length(1, 1, { message: 'La opción de respuesta debe tener 1 caracter' })
  opcion: string;

  @IsNotEmpty({ message: 'La respuesta es requerida' })
  @IsString({ message: 'La respuesta debe ser una cadena de texto' })
  @MinLength(3, { message: 'La respuesta debe tener al menos 3 caracteres' })
  @MaxLength(100, {
    message: 'La respuesta debe tener menos de 100 caracteres',
  })
  respuesta: string;

  @IsNotEmpty({ message: 'La opción correcta es requerida' })
  @IsString({ message: 'La opción correcta debe ser una cadena de texto' })
  @Length(1, 1, { message: 'La opción correcta debe tener 1 caracter' })
  opcion_correcta: string;

  @IsNotEmpty({ message: 'El id del cuestionario es requerido' })
  @IsInt({ message: 'El id del cuestionario debe ser un número entero' })
  @Min(1, { message: 'El id del cuestionario debe ser mayor o igual a 1' })
  @Max(4294967295, {
    message: 'El id del cuestionario debe ser menor o igual a 4294967295', // 2^32 - 1 = 4.294.967.295
  })
  @Transform(({ value: id_cuestionario }) => parseInt(id_cuestionario))
  id_cuestionario: number;
}

export class ActualizarOpcionRespuestaDto extends PartialType(
  CrearOpcionRespuestaDto,
) {
  @ApiPropertyOptional()
  @IsOptional()
  opcion?: string;

  @ApiPropertyOptional()
  @IsOptional()
  respuesta?: string;

  @ApiPropertyOptional()
  @IsOptional()
  opcion_correcta?: string;

  @ApiPropertyOptional()
  @IsOptional()
  id_cuestionario?: number;
}
