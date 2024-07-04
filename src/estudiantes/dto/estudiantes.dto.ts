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
import { Estudiante } from '../entities/estudiante.entity';

export class CrearEstudianteDto extends OmitType(Estudiante, ['id'] as const) {
  @IsNotEmpty({ message: 'El id de usuario es requerido' })
  @IsInt({ message: 'El id de usuario debe ser un número entero' })
  @Min(1, { message: 'El id de usuario debe ser mayor o igual a 1' })
  @Max(4294967295, {
    message: 'El id de usuario debe ser menor o igual a 4294967295', // 2^32 - 1 = 4.294.967.295
  })
  @Transform(({ value: id_usuario }) => parseInt(id_usuario))
  id_usuario: number;

  @IsNotEmpty({ message: 'El código del estudiante no puede estar vacío' })
  @IsString({
    message: 'El código del estudiante debe ser una cadena de texto',
  })
  @Length(10, 10, {
    message: 'El código del estudiante debe tener 10 caracteres',
  })
  cod_estudiante: string;

  @IsOptional()
  @IsNotEmpty({ message: 'El apodo del estudiante no puede estar vacío' })
  @IsString({ message: 'El apodo del estudiante debe ser una cadena de texto' })
  @MinLength(3, {
    message: 'El apodo del estudiante debe tener al menos 3 caracteres',
  })
  @MaxLength(30, {
    message: 'El apodo del estudiante debe tener como máximo 30 caracteres',
  })
  apodo?: string;

  @IsOptional()
  @IsNotEmpty({ message: 'El puntaje total no puede estar vacío' })
  @IsInt({ message: 'El puntaje total debe ser un número entero' })
  @Min(0, { message: 'El puntaje total debe ser mayor o igual a 0' })
  @Max(4294967295, {
    message: 'El puntaje total debe ser menor o igual a 4294967295', // 2^32 - 1 = 4.294.967.295
  })
  @Transform(({ value: puntaje_total }) => parseInt(puntaje_total))
  puntaje_total: number;
}

export class ActualizarEstudianteDto extends PartialType(CrearEstudianteDto) {
  @ApiPropertyOptional()
  @IsOptional()
  id_usuario?: number;

  @ApiPropertyOptional()
  @IsOptional()
  cod_estudiante?: string;

  @ApiPropertyOptional()
  @IsOptional()
  puntaje_total?: number;
}
