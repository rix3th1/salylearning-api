import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Docente as TDocente } from '@prisma/client';

export class Docente implements Partial<TDocente> {
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

  @ApiPropertyOptional({
    title: 'Código docente',
    description: 'Código del docente',
    example: 'DOC0012024',
    minLength: 10,
    maxLength: 10,
  })
  cod_docente?: string;
}
