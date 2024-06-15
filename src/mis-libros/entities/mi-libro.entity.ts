import { ApiProperty } from '@nestjs/swagger';
import { MiLibro as TMiLibro } from '@prisma/client';

export class MiLibro implements Partial<TMiLibro> {
  @ApiProperty({
    title: 'Id de MiLibro',
    description: 'El id de MiLibro',
    example: 1,
    minLength: 1,
    maxLength: 4294967295,
  })
  id: number;

  @ApiProperty({
    title: 'Id de libro',
    description:
      'El id de libro del libro existente que se desea agregar a la lista de libros',
    example: 1,
    minimum: 1,
    maximum: 4294967295, // 2^32 - 1 = 4.294.967.295
  })
  id_libro: number;

  @ApiProperty({
    title: 'Id de usuario',
    description:
      'El id de usuario del usuario que agrega el libro a la lista de libros',
    example: 1,
    minimum: 1,
    maximum: 4294967295, // 2^32 - 1 = 4.294.967.295
  })
  id_usuario: number;
}
