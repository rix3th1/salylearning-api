import { ApiPropertyOptional, OmitType, PartialType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  Max,
  Min,
} from 'class-validator';
import { LibroEstudiante } from '../entities/libros-estudiante.entity';

export class CrearLibroEstudianteDto extends OmitType(LibroEstudiante, [
  'id',
] as const) {
  @IsNotEmpty({ message: 'El id de libro es requerido' })
  @IsInt({ message: 'El id de libro debe ser un número entero' })
  @Min(1, { message: 'El id de libro debe ser mayor o igual a 1' })
  @Max(4294967295, {
    message: 'El id de libro debe ser menor o igual a 4294967295', // 2^32 - 1 = 4.294.967.295
  })
  @Transform(({ value: id_libro }) => parseInt(id_libro))
  id_libro: number;

  @IsNotEmpty({ message: 'El id de estudiante es requerido' })
  @IsInt({ message: 'El id de estudiante debe ser un número entero' })
  @Min(1, { message: 'El id de estudiante debe ser mayor o igual a 1' })
  @Max(4294967295, {
    message: 'El id de estudiante debe ser menor o igual a 4294967295', // 2^32 - 1 = 4.294.967.295
  })
  @Transform(({ value: id_estudiante }) => parseInt(id_estudiante))
  id_estudiante: number;

  @IsOptional()
  @IsNotEmpty({ message: 'El estado del libro es requerido' })
  @IsBoolean({ message: 'El estado del libro debe ser un valor booleano' })
  terminado?: boolean;

  @IsOptional()
  @IsNotEmpty({
    message: 'El tiempo de lectura del libro no puede estar vacío',
  })
  @IsInt({
    message: 'El tiempo de lectura del libro debe ser un número entero',
  })
  @Min(0, {
    message: 'El tiempo de lectura del libro debe ser mayor o igual a 0',
  })
  @Max(1440, {
    message: 'El tiempo de lectura del libro debe ser menor o igual a 1440',
  })
  @Transform(({ value: tiempo_lectura }) => parseInt(tiempo_lectura))
  tiempo_lectura?: number;
}

export class ActualizarLibroEstudianteDto extends PartialType(
  CrearLibroEstudianteDto,
) {
  @ApiPropertyOptional()
  @IsOptional()
  id_libro?: number;

  @ApiPropertyOptional()
  @IsOptional()
  id_estudiante?: number;
}
