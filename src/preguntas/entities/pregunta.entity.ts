import { ApiProperty } from '@nestjs/swagger';
import { Pregunta as TPregunta } from '@prisma/client';

export class Pregunta implements TPregunta {
  @ApiProperty({
    title: 'Id pregunta',
    description: 'Id de la pregunta',
    example: 1,
    minLength: 1,
    maxLength: 4294967295,
  })
  id: number;

  @ApiProperty({
    title: 'Número de pregunta',
    description: 'Número de pregunta sobre el libro leído',
    example: 1,
    minimum: 1,
    maximum: 255,
  })
  num_pregunta: number;

  @ApiProperty({
    title: 'Pregunta',
    description: 'Pregunta sobre el libro leído',
    example: '¿Qué es la programación?',
    minLength: 10,
    maxLength: 200,
  })
  pregunta: string;

  @ApiProperty({
    title: 'Respuesta A',
    description: 'Respuesta A sobre la pregunta',
    example: 'La programación es un lenguaje de programación',
    minLength: 3,
    maxLength: 100,
  })
  resA: string;

  @ApiProperty({
    title: 'Respuesta B',
    description: 'Respuesta B sobre la pregunta',
    example: 'La programación es un proceso de creación de software',
    minLength: 3,
    maxLength: 100,
  })
  resB: string;

  @ApiProperty({
    title: 'Respuesta C',
    description: 'Respuesta C sobre la pregunta',
    example: 'La programación es un conjunto de instrucciones',
    minLength: 3,
    maxLength: 100,
  })
  resC: string;

  @ApiProperty({
    title: 'Respuesta D',
    description: 'Respuesta D sobre la pregunta',
    example: 'La programación es una técnica de diseño',
    minLength: 3,
    maxLength: 100,
  })
  resD: string;

  @ApiProperty({
    title: 'Id del libro',
    description: 'Id del libro al que corresponde las preguntas',
    example: 1,
    minimum: 1,
    maximum: 4294967295, // 2^32 - 1 = 4.294.967.295
  })
  id_libro: number;
}
