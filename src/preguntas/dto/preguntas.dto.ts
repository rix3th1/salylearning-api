import { ApiPropertyOptional, OmitType, PartialType } from '@nestjs/swagger';
import { EstadoCuestionario } from '@prisma/client';
import { Transform } from 'class-transformer';
import {
  IsIn,
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
  @IsNotEmpty({ message: 'El número de pregunta es requerido' })
  @IsInt({ message: 'El número de pregunta debe ser un número entero' })
  @Min(1, { message: 'El número de pregunta debe ser mayor o igual a 1' })
  @Max(255, { message: 'El número de pregunta debe ser menor o igual a 255' })
  num_pregunta: number;

  @IsNotEmpty({ message: 'La pregunta es requerida' })
  @IsString({ message: 'La pregunta debe ser una cadena de texto' })
  @MinLength(10, { message: 'La pregunta debe tener al menos 10 caracteres' })
  @MaxLength(200, { message: 'La pregunta debe tener menos de 200 caracteres' })
  pregunta: string;

  @IsNotEmpty({ message: 'La respuesta A es requerida' })
  @IsString({ message: 'La respuesta A debe ser una cadena de texto' })
  @MinLength(3, { message: 'La respuesta A debe tener al menos 3 caracteres' })
  @MaxLength(100, {
    message: 'La respuesta A debe tener menos de 100 caracteres',
  })
  resA: string;

  @IsNotEmpty({ message: 'La respuesta B es requerida' })
  @IsString({ message: 'La respuesta B debe ser una cadena de texto' })
  @MinLength(3, { message: 'La respuesta B debe tener al menos 3 caracteres' })
  @MaxLength(100, {
    message: 'La respuesta B debe tener menos de 100 caracteres',
  })
  resB: string;

  @IsNotEmpty({ message: 'La respuesta C es requerida' })
  @IsString({ message: 'La respuesta C debe ser una cadena de texto' })
  @MinLength(3, { message: 'La respuesta C debe tener al menos 3 caracteres' })
  @MaxLength(100, {
    message: 'La respuesta C debe tener menos de 100 caracteres',
  })
  resC: string;

  @IsNotEmpty({ message: 'La respuesta D es requerida' })
  @IsString({ message: 'La respuesta D debe ser una cadena de texto' })
  @MinLength(3, { message: 'La respuesta D debe tener al menos 3 caracteres' })
  @MaxLength(100, {
    message: 'La respuesta D debe tener menos de 100 caracteres',
  })
  resD: string;

  @IsNotEmpty({ message: 'El id de libro es requerido' })
  @IsInt({ message: 'El id de libro debe ser un número entero' })
  @Min(1, { message: 'El id de libro debe ser mayor o igual a 1' })
  @Max(4294967295, {
    message: 'El id de libro debe ser menor o igual a 4294967295', // 2^32 - 1 = 4.294.967.295
  })
  id_libro: number;

  @IsOptional()
  @IsNotEmpty({ message: 'El estado del cuestionario no puede estar vacío' })
  @IsString({
    message: 'El estado del cuestionario debe ser una cadena de texto',
  })
  @MinLength(3, {
    message: 'El estado del cuestionario debe tener al menos 3 caracteres',
  })
  @MaxLength(30, {
    message: 'El estado del cuestionario debe tener menos de 30 caracteres',
  })
  @IsIn(Object.values(EstadoCuestionario), {
    message: `El estado del cuestionario debe ser uno de los siguientes valores: ${Object.values(
      EstadoCuestionario,
    ).join(', ')}`,
  })
  @Transform(({ value: estado }) => estado.toUpperCase())
  estado: EstadoCuestionario;
}

export class ActualizarPreguntaDto extends PartialType(CrearPreguntaDto) {
  @ApiPropertyOptional()
  @IsOptional()
  num_pregunta?: number;

  @ApiPropertyOptional()
  @IsOptional()
  pregunta?: string;

  @ApiPropertyOptional()
  @IsOptional()
  resA?: string;

  @ApiPropertyOptional()
  @IsOptional()
  resB?: string;

  @ApiPropertyOptional()
  @IsOptional()
  resC?: string;

  @ApiPropertyOptional()
  @IsOptional()
  resD?: string;

  @ApiPropertyOptional()
  @IsOptional()
  id_libro?: number;
}
