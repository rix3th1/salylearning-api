import {
  ApiProperty,
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
  isArray,
} from 'class-validator';
import {
  Cuestionario,
  CuestionarioConPreguntas,
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
  CuestionarioConPreguntas,
) {
  @IsArray({
    message: 'Las preguntas del cuestionario deben ser un arreglo de números',
  })
  @IsNotEmpty({
    message: 'Las preguntas del cuestionario no pueden estar vacías',
  })
  @IsNumber(
    { allowNaN: false, allowInfinity: false, maxDecimalPlaces: 0 },
    { each: true, message: 'Las preguntas deben ser números enteros' },
  )
  declare preguntas: number[];
}

export class ActualizarCuestionarioDto extends PartialType(
  CrearCuestionarioDto,
) {
  @ApiPropertyOptional()
  @IsOptional()
  fecha_entrega?: Date;
}
