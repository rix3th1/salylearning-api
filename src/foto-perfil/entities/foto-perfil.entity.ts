import { ApiProperty } from '@nestjs/swagger';
import { FotoPerfil as TFotoPerfil } from '@prisma/client';

export class FotoPerfil implements TFotoPerfil {
  @ApiProperty({
    title: 'Id',
    description: 'Id de la foto de perfil',
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
    title: 'Foto',
    description: 'Foto de perfil',
    type: 'string',
    example:
      'https://res.cloudinary.com/xxxxx/image/upload/v1630000000/xxxxx.jpg',
    format: 'binary',
  })
  foto: string;
}
