import { ApiProperty } from '@nestjs/swagger';
import { OpcionRespuesta as TOpcionRespuesta } from '@prisma/client';

export class OpcionRespuesta implements Partial<TOpcionRespuesta> {
  @ApiProperty({
    title: 'Id de la opción de respuesta',
    description: 'El id de la opción de respuesta',
    example: 1,
    minLength: 1,
    maxLength: 4294967295,
  })
  id: number;

  @ApiProperty({
    title: 'Opción',
    description: 'La opción',
    example: 'A',
    minLength: 1,
    maxLength: 1,
  })
  opcion: string;

  @ApiProperty({
    title: 'Respuesta',
    description: 'La respuesta sobre la pregunta del libro leído',
    example:
      'La programación es una disciplina que se dedica a la creación de programas y sistemas.',
    minLength: 3,
    maxLength: 100,
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
