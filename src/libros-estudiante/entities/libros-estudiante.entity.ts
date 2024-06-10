import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { LibroEstudiante as TLibroEstudiante } from '@prisma/client';

export class LibroEstudiante implements Partial<TLibroEstudiante> {
  @ApiProperty({
    title: 'Id de LibroEstudiante',
    description: 'El id de LibroEstudiante',
    example: 1,
    minLength: 1,
    maxLength: 4294967295,
  })
  id: number;

  @ApiProperty({
    title: 'Id de libro',
    description:
      'El id de libro del libro existente que se desea agregar a la lista de libros de estudiante',
    example: 1,
    minimum: 1,
    maximum: 4294967295, // 2^32 - 1 = 4.294.967.295
  })
  id_libro: number;

  @ApiProperty({
    title: 'Id de estudiante',
    description:
      'El id de estudiante del estudiante que agrega el libro a la lista de libros de estudiante',
    example: 1,
    minimum: 1,
    maximum: 4294967295, // 2^32 - 1 = 4.294.967.295
  })
  id_estudiante: number;

  @ApiPropertyOptional({
    title: 'Terminado',
    description: 'El estado del libro en la lista de libros',
    example: false,
  })
  terminado?: boolean;

  @ApiPropertyOptional({
    title: 'Tiempo de lectura',
    description: 'El tiempo de lectura del libro en minutos',
    example: 60,
    minimum: 0,
    maximum: 1440,
  })
  tiempo_lectura?: number;
}
