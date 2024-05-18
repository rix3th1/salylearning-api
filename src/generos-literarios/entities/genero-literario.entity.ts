import { ApiProperty } from '@nestjs/swagger';
import { GeneroLiterario as TGeneroLiterario } from '@prisma/client';

export class GeneroLiterario implements TGeneroLiterario {
  @ApiProperty({
    title: 'Id genero literario',
    description: 'El id del genero literario',
    example: 1,
    minLength: 1,
    maxLength: 4294967295,
  })
  id: number;

  @ApiProperty({
    title: 'Nombre genero',
    description: 'El nombre del genero literario',
    example: 'Fantasía',
    minLength: 3,
    maxLength: 30,
  })
  nom_genero: string;

  @ApiProperty({
    title: 'Descripción genero literario',
    description: 'La descripción del genero literario',
    example:
      'Género literario que se caracteriza por la presencia de elementos irreales o imaginarios',
    minLength: 3,
    maxLength: 500,
  })
  descripcion: string;
}
