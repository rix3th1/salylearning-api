import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Pregunta as TPregunta } from '@prisma/client';

export class Pregunta implements Partial<TPregunta> {
  @ApiProperty({
    title: 'Id pregunta',
    description: 'Id de la pregunta',
    example: 1,
    minLength: 1,
    maxLength: 4294967295,
  })
  id: number;

  @ApiProperty({
    title: 'Pregunta',
    description: 'Pregunta sobre el libro leído',
    example: '¿Qué es la programación?',
    minLength: 10,
    maxLength: 200,
  })
  pregunta: string;

  @ApiProperty({
    title: 'Opción correcta',
    description: 'La opción correcta',
    example: 'A',
    minLength: 1,
    maxLength: 1,
  })
  opcion_correcta: string;

  @ApiProperty({
    title: 'Id del libro',
    description: 'Id del libro al que corresponde las preguntas',
    example: 1,
    minimum: 1,
    maximum: 4294967295, // 2^32 - 1 = 4.294.967.295
  })
  id_libro: number;

  @ApiPropertyOptional({
    title: 'Id cuestionario',
    description: 'Id del cuestionario asociado a la pregunta',
    example: 1,
    minimum: 1,
    maximum: 4294967295,
  })
  id_cuestionario?: number;
}
