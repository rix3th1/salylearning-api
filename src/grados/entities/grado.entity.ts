import { ApiProperty } from '@nestjs/swagger';
import { Grado as TGrado } from '@prisma/client';

export abstract class GradoSinId implements Partial<TGrado> {
  @ApiProperty({
    title: 'Nombre del grado',
    description: 'El nombre del grado',
    example: 'Primaria',
    minLength: 3,
    maxLength: 30,
  })
  nom_grado?: string;
}

export abstract class Grado extends GradoSinId implements Partial<TGrado> {
  @ApiProperty({
    title: 'Id del grado',
    description: 'El id del grado',
    example: 1,
    minLength: 1,
    maxLength: 4294967295,
  })
  id: number;
}
