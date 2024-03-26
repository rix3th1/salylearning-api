import { ApiProperty } from '@nestjs/swagger';
import { GradoUsuario as TGradoUsuario } from '@prisma/client';

export class GradoUsuario implements TGradoUsuario {
  @ApiProperty({
    title: 'Id grado usuario',
    description: 'El id del grado del usuario',
    example: 1,
    minLength: 1,
    maxLength: 4294967295,
  })
  id: number;

  @ApiProperty({
    title: 'Id de grado',
    description: 'El id de grado del usuario',
    example: 1,
    minimum: 1,
    maximum: 4294967295, // 2^32 - 1 = 4.294.967.295
  })
  id_grado: number;

  @ApiProperty({
    title: 'Id de usuario',
    description: 'El id de usuario del grado',
    example: 1,
    minimum: 1,
    maximum: 4294967295, // 2^32 - 1 = 4.294.967.295,
  })
  id_usuario: number;
}
