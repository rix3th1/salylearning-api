import { ApiProperty } from '@nestjs/swagger';
import { AvatarUsuario as TAvatarUsuario } from '@prisma/client';

export abstract class AvatarUsuario implements Partial<TAvatarUsuario> {
  @ApiProperty({
    title: 'Id Avatar',
    description: 'El id de avatar del usuario',
    example: 1,
    minimum: 1,
    maximum: 4294967295, // 2^32 - 1 = 4.294.967.295
  })
  id_avatar?: number;

  @ApiProperty({
    title: 'Id Usuario',
    description: 'El id de usuario del avatar',
    example: 1,
    minimum: 1,
    maximum: 4294967295, // 2^32 - 1 = 4.294.967.295
  })
  id_usuario?: number;
}
