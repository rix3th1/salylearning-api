import { ApiProperty } from '@nestjs/swagger';
import { Contacto as TContacto } from '@prisma/client';

export class Contacto implements TContacto {
  @ApiProperty({
    title: 'Id',
    description: 'Id del contacto',
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
    description: 'Mensaje de contacto',
    example: 'Hola, quiero contactarte',
    minLength: 10,
    maxLength: 500,
  })
  mensaje: string;
}
