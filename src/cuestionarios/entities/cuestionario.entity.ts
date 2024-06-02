import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  EstadoCuestionario,
  Cuestionario as TCuestionario,
} from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

export class Cuestionario implements Partial<TCuestionario> {
  @ApiProperty({
    title: 'Id cuestionario',
    description: 'Id del cuestionario',
    example: 1,
    minimum: 1,
    maximum: 4294967295,
  })
  id: number;

  @ApiProperty({
    title: 'Id pregunta',
    description: 'Id de la pregunta asociada al cuestionario',
    example: 1,
    minimum: 1,
    maximum: 4294967295,
  })
  id_pregunta: number;

  @ApiPropertyOptional({
    title: 'Estado del cuestionario',
    description: `Estado del cuestionario (Opcional, por defecto: ${EstadoCuestionario.PENDIENTE})`,
    example: EstadoCuestionario.PENDIENTE,
    enum: EstadoCuestionario,
    default: EstadoCuestionario.PENDIENTE,
    minLength: 3,
    maxLength: 30,
  })
  estado: EstadoCuestionario;

  @ApiPropertyOptional({
    title: 'Fecha de asignación',
    description: 'Fecha de asignación del cuestionario',
    example: new Date(),
    type: 'string',
    format: 'date-time',
  })
  fecha_asignado: Date;

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
}
