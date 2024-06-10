import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  EstadoCuestionario,
  Cuestionario as TCuestionario,
} from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import { OpcionRespuesta } from '../../opciones-respuesta/entities/opcion-respuesta.entity';
import { Pregunta } from '../../preguntas/entities/pregunta.entity';

export class Cuestionario implements Partial<TCuestionario> {
  @ApiProperty({
    title: 'Id cuestionario',
    description: 'Id del cuestionario',
    example: 1,
    minimum: 1,
    maximum: 4294967295,
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

export class CuestionarioAsignacion extends Cuestionario {
  @ApiProperty({
    title: 'Preguntas',
    description: 'Preguntas del cuestionario',
    type: [Pregunta],
  })
  preguntas: Pregunta[];

  @ApiProperty({
    title: 'Opciones de respuesta',
    description: 'Opciones de respuesta de las preguntas',
    type: [OpcionRespuesta],
  })
  opciones_respuesta: OpcionRespuesta[];
}
