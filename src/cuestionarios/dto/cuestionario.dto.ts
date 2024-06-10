import {
  ApiPropertyOptional,
  IntersectionType,
  OmitType,
  PartialType,
} from '@nestjs/swagger';
import { EstadoCuestionario } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import { Transform } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { OpcionRespuesta } from '../../opciones-respuesta/entities/opcion-respuesta.entity';
import { Pregunta } from '../../preguntas/entities/pregunta.entity';
import {
  Cuestionario,
  CuestionarioAsignacion,
} from '../entities/cuestionario.entity';

export class CrearCuestionarioDto extends OmitType(Cuestionario, [
  'id',
] as const) {
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

  @IsOptional()
  @IsNotEmpty({
    message: 'La fecha de asignación del cuestionario no puede estar vacía',
  })
  @IsDate({
    message: 'La fecha de asignación del cuestionario debe ser una fecha',
  })
  @Transform(({ value: fecha_asignado }) =>
    fecha_asignado ? new Date(fecha_asignado) : null,
  )
  fecha_asignado: Date;

  @IsNotEmpty({ message: 'La fecha de entrega del cuestionario es requerida' })
  @IsDate({
    message: 'La fecha de entrega del cuestionario debe ser una fecha',
  })
  @Transform(({ value: fecha_entrega }) =>
    fecha_entrega ? new Date(fecha_entrega) : null,
  )
  fecha_entrega: Date;

  @IsOptional()
  @IsNotEmpty({
    message: 'La calificación del cuestionario no puede estar vacía',
  })
  @IsNumber(
    { allowNaN: false, allowInfinity: false, maxDecimalPlaces: 1 },
    { message: 'La calificación debe ser un número decimal' },
  )
  @Min(0.0, { message: 'La calificación debe ser mayor o igual a 0.0' })
  @Max(5.0, { message: 'La calificación debe ser menor o igual a 5.0' })
  @Transform(({ value: calificacion }) => Number(calificacion) || null)
  calificacion?: Decimal;
}

export class crearCuestionarioConPreguntasDto extends IntersectionType(
  CrearCuestionarioDto,
  CuestionarioAsignacion,
) {
  @IsArray({
    message: 'Las preguntas del cuestionario deben ser un arreglo de números',
  })
  @IsNotEmpty({
    message: 'Las preguntas del cuestionario no pueden estar vacías',
  })
  declare preguntas: Pregunta[];

  @IsArray({
    message:
      'Las opciones de respuesta del cuestionario deben ser un arreglo de objetos',
  })
  @IsNotEmpty({
    message:
      'Las opciones de respuesta del cuestionario no pueden estar vacías',
  })
  declare opciones_respuesta: OpcionRespuesta[];
}

export class ActualizarCuestionarioDto extends PartialType(
  CrearCuestionarioDto,
) {
  @ApiPropertyOptional()
  @IsOptional()
  fecha_entrega?: Date;
}
