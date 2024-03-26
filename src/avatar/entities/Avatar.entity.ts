import { ApiProperty } from '@nestjs/swagger';
import { Avatar as TAvatar } from '@prisma/client';

export abstract class Avatar implements Partial<TAvatar> {
  @ApiProperty({
    title: 'Nombre del avatar',
    description: 'Nombre del avatar',
    example: 'Avatar 1',
    minLength: 3,
    maxLength: 30,
  })
  nom_avatar?: string;
}
