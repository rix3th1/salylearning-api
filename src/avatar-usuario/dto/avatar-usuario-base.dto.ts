import { ApiProperty } from '@nestjs/swagger';
import { AvatarUsuario } from '@prisma/client';
import { IsInt, Max, Min } from 'class-validator';

export class AvatarUsuarioBaseDto implements Partial<AvatarUsuario> {
  @ApiProperty({
    title: 'Id Avatar',
    description: 'El id de avatar del usuario',
    example: 1,
    minimum: 1,
    maximum: 4294967295, // 2^32 - 1 = 4.294.967.295
  })
  @IsInt({ message: 'El id de avatar debe ser un número entero' })
  @Min(1, { message: 'El id de avatar debe ser mayor o igual a 1' })
  @Max(4294967295, {
    message: 'El id de avatar debe ser menor o igual a 4294967295', // 2^32 - 1 = 4.294.967.295
  })
  id_avatar?: number;

  @ApiProperty({
    title: 'Id Usuario',
    description: 'El id de usuario del avatar',
    example: 1,
    minimum: 1,
    maximum: 4294967295, // 2^32 - 1 = 4.294.967.295
  })
  @IsInt({ message: 'El id de usuario debe ser un número entero' })
  @Min(1, { message: 'El id de usuario debe ser mayor o igual a 1' })
  @Max(4294967295, {
    message: 'El id de usuario debe ser menor o igual a 4294967295', // 2^32 - 1 = 4.294.967.295
  })
  id_usuario?: number;
}
