import { ApiProperty } from '@nestjs/swagger';
import { Libro as TLibro } from '@prisma/client';

export class Libro implements TLibro {
  @ApiProperty({
    title: 'Id del libro',
    description: 'El id del libro',
    example: 1,
    minLength: 1,
    maxLength: 4294967295,
  })
  id: number;

  @ApiProperty({
    title: 'Nombre del libro',
    description: 'El nombre del libro',
    example: 'El libro de la mente',
    minLength: 3,
    maxLength: 100,
  })
  nom_libro: string;

  @ApiProperty({
    title: 'Número de páginas',
    description: 'El número de páginas del libro',
    example: 100,
    minLength: 1,
    maxLength: 255,
  })
  num_pag: number;

  @ApiProperty({
    title: 'Cantidad de veces leído',
    description: 'La cantidad de veces que el libro ha sido leído',
    example: 5,
    minLength: 0,
    maxLength: 4294967295,
  })
  cant_leido: number;

  @ApiProperty({
    title: 'Id de grado',
    description: 'El id de grado del libro',
    example: 1,
    minLength: 1,
    maxLength: 4294967295,
  })
  id_grado: number;
}
