import { ApiProperty } from '@nestjs/swagger';
import { MisLibros } from '@prisma/client';
import { IsBoolean, IsInt, IsNotEmpty, Max, Min } from 'class-validator';

export class MiLibroBaseDto implements Partial<MisLibros> {
  @ApiProperty({
    title: 'Id de libro',
    description:
      'El id de libro del libro existente que se desea agregar a la lista de libros',
    example: 1,
    minimum: 1,
    maximum: 4294967295, // 2^32 - 1 = 4.294.967.295
  })
  @IsNotEmpty({ message: 'El id de libro es requerido' })
  @IsInt({ message: 'El id de libro debe ser un número entero' })
  @Min(1, { message: 'El id de libro debe ser mayor o igual a 1' })
  @Max(4294967295, {
    message: 'El id de libro debe ser menor o igual a 4294967295', // 2^32 - 1 = 4.294.967.295
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
  @IsNotEmpty({ message: 'El id de usuario es requerido' })
  @IsInt({ message: 'El id de usuario debe ser un número entero' })
  @Min(1, { message: 'El id de usuario debe ser mayor o igual a 1' })
  @Max(4294967295, {
    message: 'El id de usuario debe ser menor o igual a 4294967295', // 2^32 - 1 = 4.294.967.295
  })
  id_usuario?: number;

  @ApiProperty({
    title: 'Terminado',
    description: 'El estado del libro en la lista de libros',
    example: false,
  })
  @IsNotEmpty({ message: 'El estado del libro es requerido' })
  @IsBoolean({ message: 'El estado del libro debe ser un valor booleano' })
  terminado?: boolean;
}
