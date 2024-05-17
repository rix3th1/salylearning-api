import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Libro as TLibro } from '@prisma/client';

export class Libro implements Partial<TLibro> {
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
    title: 'Autor del libro',
    description: 'El autor del libro',
    example: 'Juan Pérez',
    minLength: 3,
    maxLength: 100,
  })
  autor: string;

  @ApiProperty({
    title: 'Editorial del libro',
    description: 'La editorial del libro',
    example: 'Editorial Pérez',
    minLength: 3,
    maxLength: 50,
  })
  editorial: string;

  @ApiProperty({
    title: 'Más información del libro',
    description: 'Más información del libro',
    example: 'https://wwww.wikipedia.org/xxxxx',
    minLength: 3,
    maxLength: 255,
    format: 'url',
  })
  url_info: string;

  @ApiProperty({
    title: 'Fecha de publicación',
    description: 'La fecha de publicación del libro',
    example: new Date(),
    type: 'string',
    format: 'date',
  })
  fecha_pub: Date;

  @ApiProperty({
    title: 'Id de género literario',
    description: 'El id del género literario del libro',
    example: 1,
    minLength: 1,
    maxLength: 4294967295,
  })
  id_genero_literario: number;

  @ApiPropertyOptional({
    title: 'Cantidad de veces leído',
    description: 'La cantidad de veces que el libro ha sido leído',
    example: 5,
    minLength: 0,
    maxLength: 4294967295,
  })
  cant_leido?: number;

  @ApiProperty({
    title: 'Imagen de portada',
    description: 'La imagen de portada del libro',
    type: 'string',
    example:
      'https://res.cloudinary.com/xxxxx/image/upload/v1630000000/xxxxx.jpg',
    format: 'binary',
  })
  imagen_portada: string;

  @ApiProperty({
    title: 'URL del libro',
    description: 'La URL del libro en la librería (Canva, Google Books, etc.)',
    example: 'https://www.canva.com/xxxxx/xxxxx-xxxxx-xxxxx-xxxxx/',
    minLength: 3,
    maxLength: 255,
    format: 'url',
  })
  url_libro: string;

  @ApiProperty({
    title: 'Id de grado',
    description: 'El id de grado del libro',
    example: 1,
    minLength: 1,
    maxLength: 4294967295,
  })
  id_grado: number;
}
