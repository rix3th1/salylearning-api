import { ApiPropertyOptional, OmitType, PartialType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, Max, Min } from 'class-validator';
import { CuestionarioEstudiante } from '../entities/cuestionario-estudiante.entity';

export class CrearCuestionarioEstudianteDto extends OmitType(
  CuestionarioEstudiante,
  ['id'] as const,
) {
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

export class asignarCuestionarioEstudianteATodosLosEstudiantesDto extends OmitType(
  CrearCuestionarioEstudianteDto,
  ['id_estudiante'],
) {}

export class ActualizarCuestionarioEstudianteDto extends PartialType(
  CrearCuestionarioEstudianteDto,
) {
  @ApiPropertyOptional()
  @IsOptional()
  id_cuestionario?: number;

  @ApiPropertyOptional()
  @IsOptional()
  id_estudiante?: number;
}
