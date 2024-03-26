import { IsString, MaxLength, MinLength } from 'class-validator';
import { Avatar } from '../entities/Avatar.entity';

export abstract class AvatarBaseDto extends Avatar {
  @IsString({ message: 'El nombre del avatar debe ser una cadena de texto' })
  @MinLength(3, {
    message: 'El nombre del avatar debe tener al menos 3 caracteres',
  })
  @MaxLength(30, {
    message: 'El nombre del avatar no puede tener más de 30 caracteres',
  })
  nom_avatar?: string;
}
