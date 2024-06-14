import { ApiProperty } from '@nestjs/swagger';
import { Cuestionario as TCuestionario } from '@prisma/client';
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
