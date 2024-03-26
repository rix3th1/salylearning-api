import { ApiProperty } from '@nestjs/swagger';
import { Avatar } from '@prisma/client';
import { IsString, MaxLength, MinLength } from 'class-validator';

export abstract class AvatarBaseDto implements Partial<Avatar> {
  @ApiProperty({
    title: 'Nombre del avatar',
    description: 'Nombre del avatar',
    example: 'Avatar 1',
    minLength: 3,
    maxLength: 30,
  })
  @IsString({ message: 'El nombre del avatar debe ser una cadena de texto' })
  @MinLength(3, {
    message: 'El nombre del avatar debe tener al menos 3 caracteres',
  })
  @MaxLength(30, {
    message: 'El nombre del avatar no puede tener más de 30 caracteres',
  })
  nom_avatar?: string;
}
