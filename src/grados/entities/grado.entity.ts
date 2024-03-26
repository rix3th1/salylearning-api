import { ApiProperty } from '@nestjs/swagger';
import { Grado as TGrado } from '@prisma/client';

export abstract class Grado implements Partial<TGrado> {
  @ApiProperty({
    title: 'Nombre del grado',
    description: 'El nombre del grado',
    example: 'Primaria',
    minLength: 3,
    maxLength: 30,
  })
  nom_grado?: string;
}
