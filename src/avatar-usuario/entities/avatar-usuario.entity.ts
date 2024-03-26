import { ApiProperty } from '@nestjs/swagger';
import { AvatarUsuario as TAvatarUsuario } from '@prisma/client';

export class AvatarUsuario implements TAvatarUsuario {
  @ApiProperty({
    title: 'Id Avatar usuario',
    description: 'El id del avatar de usuario',
    example: 1,
    minLength: 1,
    maxLength: 4294967295,
  })
  id: number;

  @ApiProperty({
    title: 'Id Avatar',
    description: 'El id de avatar del usuario',
    example: 1,
    minimum: 1,
    maximum: 4294967295, // 2^32 - 1 = 4.294.967.295
  })
  id_avatar: number;

  @ApiProperty({
    title: 'Id Usuario',
    description: 'El id de usuario del avatar',
    example: 1,
    minimum: 1,
    maximum: 4294967295, // 2^32 - 1 = 4.294.967.295
  })
  id_usuario: number;
}
