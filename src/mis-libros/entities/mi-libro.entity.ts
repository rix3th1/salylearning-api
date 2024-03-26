import { ApiProperty } from '@nestjs/swagger';
import { MisLibros } from '@prisma/client';

export abstract class MiLibro implements Partial<MisLibros> {
  @ApiProperty({
    title: 'Id de libro',
    description:
      'El id de libro del libro existente que se desea agregar a la lista de libros',
    example: 1,
    minimum: 1,
    maximum: 4294967295, // 2^32 - 1 = 4.294.967.295
  })
  id_libro?: number;

  @ApiProperty({
    title: 'Id de usuario',
    description:
      'El id de usuario del usuario que agrega el libro a la lista de libros',
    example: 1,
    minimum: 1,
    maximum: 4294967295, // 2^32 - 1 = 4.294.967.295
  })
  id_usuario?: number;

  @ApiProperty({
    title: 'Terminado',
    description: 'El estado del libro en la lista de libros',
    example: false,
  })
  terminado?: boolean;
}
