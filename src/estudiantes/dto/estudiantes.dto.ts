import { ApiPropertyOptional, OmitType, PartialType } from '@nestjs/swagger';
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
  id_usuario: number;

  @IsOptional()
  @IsNotEmpty({ message: 'El código del estudiante no puede estar vacío' })
  @IsString({
    message: 'El código del estudiante debe ser una cadena de texto',
  })
  @Length(10, 10, {
    message: 'El código del estudiante debe tener 10 caracteres',
  })
  cod_estudiante?: string;

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
}

export class ActualizarEstudianteDto extends PartialType(CrearEstudianteDto) {
  @ApiPropertyOptional()
  @IsOptional()
  id_usuario?: number;
}
