import { ApiProperty } from '@nestjs/swagger';
import { Respuesta as TRespuesta } from '@prisma/client';

export class Respuesta implements TRespuesta {
  @ApiProperty({
    title: 'Id de la respuesta',
    description: 'El id de la respuesta',
    example: 1,
    minLength: 1,
    maxLength: 4294967295,
  })
  id: number;

  @ApiProperty({
    title: 'Respuesta',
    description: 'La respuesta',
    example: 'A',
    minLength: 1,
    maxLength: 1,
  })
  respuesta: string;

  @ApiProperty({
    title: 'Id del cuestionario',
    description: 'El id del cuestionario',
    example: 1,
    minLength: 1,
    maxLength: 4294967295,
  })
  id_cuestionario: number;
}
