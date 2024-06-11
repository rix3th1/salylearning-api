import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Estudiante as TEstudiante } from '@prisma/client';

export class Estudiante implements Partial<TEstudiante> {
  @ApiProperty({
    title: 'Id',
    description: 'Id del estudiante',
    example: 1,
    minimum: 1,
    maximum: 4294967295,
  })
  id: number;

  @ApiProperty({
    title: 'Usuario',
    description: 'Id del usuario',
    example: 1,
    minimum: 1,
    maximum: 4294967295,
  })
  id_usuario: number;

  @ApiPropertyOptional({
    title: 'Código estudiante',
    description: 'Código del estudiante',
    example: '2019100001',
    minLength: 10,
    maxLength: 10,
  })
  cod_estudiante?: string;

  @ApiPropertyOptional({
    title: 'Apodo',
    description: 'Apodo del estudiante',
    example: 'Pepito',
    minLength: 3,
    maxLength: 30,
  })
  apodo?: string;

  @ApiProperty({
    title: 'Puntaje total',
    description: 'Puntaje total del estudiante',
    example: 0,
    minimum: 0,
    maximum: 4294967295,
  })
  puntaje_total: number;
}
