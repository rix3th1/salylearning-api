import { ApiProperty } from '@nestjs/swagger';
import { Docente as TDocente } from '@prisma/client';

export class Docente implements TDocente {
  @ApiProperty({
    title: 'Id',
    description: 'Id del docente',
    example: 1,
    minimum: 1,
    maximum: 4294967295,
  })
  id: number;

  @ApiProperty({
    title: 'Usuario',
    description: 'Id del usuario',
    example: 1,
    minimum: 1,
    maximum: 4294967295,
  })
  id_usuario: number;

  @ApiProperty({
    title: 'Código docente',
    description: 'Código del docente',
    example: 'DOC001',
    minLength: 6,
    maxLength: 6,
  })
  cod_docente: string;
}
