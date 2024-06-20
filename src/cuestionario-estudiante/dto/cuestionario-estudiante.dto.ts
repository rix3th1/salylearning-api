import { ApiPropertyOptional, OmitType, PartialType } from '@nestjs/swagger';
import { EstadoCuestionario } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import { Transform } from 'class-transformer';
import {
  IsDate,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { CuestionarioEstudiante } from '../entities/cuestionario-estudiante.entity';

export class CrearCuestionarioEstudianteDto extends OmitType(
  CuestionarioEstudiante,
  ['id'] as const,
) {
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
  estado?: EstadoCuestionario;

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
  fecha_asignado?: Date;

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
  @Transform(({ value: calificacion }) => {
    const cal = Number(calificacion);
    return cal || cal === 0 ? cal : null;
  })
  calificacion?: Decimal;

  @IsOptional()
  @IsNotEmpty({
    message: 'El comentario de retroalimentación no puede estar vacío',
  })
  @IsString({
    message: 'El comentario de retroalimentación debe ser una cadena de texto',
  })
  @MinLength(3, {
    message:
      'El comentario de retroalimentación debe tener al menos 3 caracteres',
  })
  @MaxLength(500, {
    message:
      'El comentario de retroalimentación debe tener menos de 500 caracteres',
  })
  retroalimentacion?: string;

  @IsNotEmpty({ message: 'El id de cuestionario estudiante es requerido' })
  @IsInt({
    message: 'El id de cuestionario estudiante debe ser un número entero',
  })
  @Min(1, {
    message: 'El id de cuestionario estudiante debe ser mayor o igual a 1',
  })
  @Max(4294967295, {
    message:
      'El id de cuestionario estudiante debe ser menor o igual a 4294967295',
  }) // 2^32 - 1 = 4.294.967.295
  @Transform(({ value: id_cuestionario }) => parseInt(id_cuestionario))
  id_cuestionario: number;

  @IsNotEmpty({ message: 'El id de estudiante es requerido' })
  @IsInt({ message: 'El id de estudiante debe ser un número entero' })
  @Min(1, { message: 'El id de estudiante debe ser mayor o igual a 1' })
  @Max(4294967295, {
    message: 'El id de estudiante debe ser menor o igual a 4294967295',
  }) // 2^32 - 1 = 4.294.967.295
  @Transform(({ value: id_estudiante }) => parseInt(id_estudiante))
  id_estudiante: number;
}

export class ActualizarCuestionarioEstudianteDto extends PartialType(
  CrearCuestionarioEstudianteDto,
) {
  @ApiPropertyOptional()
  @IsOptional()
  fecha_entrega?: Date;

  @ApiPropertyOptional()
  @IsOptional()
  id_cuestionario?: number;

  @ApiPropertyOptional()
  @IsOptional()
  id_estudiante?: number;
}

export class asignarCuestionarioEstudianteATodosLosEstudiantesDto extends OmitType(
  CrearCuestionarioEstudianteDto,
  ['id_estudiante'] as const,
) {}
