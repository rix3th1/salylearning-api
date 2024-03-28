import { ApiProperty } from '@nestjs/swagger';
import { Comentario as TComentario } from '@prisma/client';

export class Comentario implements TComentario {
  @ApiProperty({
    title: 'Id del comentario',
    description: 'Id del comentario',
    example: 1,
    minimum: 1,
    maximum: 4294967295,
  })
  id: number;

  @ApiProperty({
    title: 'Nombre completo',
    description: 'Nombre completo de la persona',
    example: 'John Doe',
    minLength: 6,
    maxLength: 60,
  })
  nombre_completo: string;

  @ApiProperty({
    title: 'Email',
    description: 'Email de la persona',
    example: 'johndoe@example.com',
    minLength: 5,
    maxLength: 100,
  })
  email: string;

  @ApiProperty({
    title: 'Telefono',
    description: 'Telefono de la persona',
    example: '0000000000',
    minLength: 10,
    maxLength: 10,
  })
  telefono: string;

  @ApiProperty({
    title: 'Mensaje',
    description: 'Mensaje del comentario',
    example: 'Este es un comentario de ejemplo',
    minLength: 10,
    maxLength: 500,
  })
  mensaje: string;
}
