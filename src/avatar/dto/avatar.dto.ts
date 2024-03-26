import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { AvatarBaseDto } from './avatar-base.dto';

export class CrearAvatarDto extends AvatarBaseDto {
  nom_avatar: string;
}

export class ActualizarAvatarDto extends AvatarBaseDto {
  @ApiPropertyOptional()
  @IsOptional()
  nom_avatar?: string;
}
