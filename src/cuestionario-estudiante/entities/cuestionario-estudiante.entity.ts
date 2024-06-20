import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  EstadoCuestionario,
  CuestionarioEstudiante as TCuestionarioEstudiante,
} from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

export class CuestionarioEstudiante
  implements Partial<TCuestionarioEstudiante>
{
  @ApiProperty({
    title: 'Id de cuestionario estudiante',
    description: 'El id del cuestionario estudiante',
    example: 1,
    minimum: 1,
    maximum: 4294967295, // 2^32 - 1 = 4.294.967.295
  })
  id: number;

  @ApiPropertyOptional({
    title: 'Estado del cuestionario',
    description: `Estado del cuestionario (Opcional, por defecto: ${EstadoCuestionario.PENDIENTE})`,
    example: EstadoCuestionario.PENDIENTE,
    enum: EstadoCuestionario,
    default: EstadoCuestionario.PENDIENTE,
    minLength: 3,
    maxLength: 30,
  })
  estado?: EstadoCuestionario;

  @ApiPropertyOptional({
    title: 'Fecha de asignación',
    description: 'Fecha de asignación del cuestionario',
    example: new Date(),
    type: 'string',
    format: 'date-time',
  })
  fecha_asignado?: Date;

  @ApiProperty({
    title: 'Fecha de entrega',
    description: 'Fecha de entrega del cuestionario',
    example: new Date(),
    type: 'string',
    format: 'date-time',
  })
  fecha_entrega: Date;

  @ApiPropertyOptional({
    title: 'Calificación',
    description: 'Calificación del cuestionario de 0.0 a 5.0',
    example: 5.0,
    type: 'number',
    format: 'decimal',
    minimum: 0.0,
    maximum: 5.0,
  })
  calificacion?: Decimal;

  @ApiPropertyOptional({
    title: 'Comentario de retroalimentación',
    description: 'Comentario de retroalimentación por parte del docente',
    example: 'El cuestionario fue muy bien',
    minLength: 3,
    maxLength: 500,
  })
  retroalimentacion?: string;

  @ApiProperty({
    title: 'Id de cuestionario',
    description: 'El id del cuestionario',
    example: 1,
    minimum: 1,
    maximum: 4294967295, // 2^32 - 1 = 4.294.967.295
  })
  id_cuestionario: number;

  @ApiProperty({
    title: 'Id de estudiante',
    description: 'El id del estudiante',
    example: 1,
    minimum: 1,
    maximum: 4294967295, // 2^32 - 1 = 4.294.967.295
  })
  id_estudiante: number;
}
