import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { AvatarUsuarioBaseDto } from './avatar-usuario-base.dto';

export class CrearAvatarUsuarioDto extends AvatarUsuarioBaseDto {
  id_avatar: number;
  id_usuario: number;
}

export class ActualizarAvatarUsuarioDto extends AvatarUsuarioBaseDto {
  @ApiPropertyOptional()
  @IsOptional()
  id_avatar?: number;

  @ApiPropertyOptional()
  @IsOptional()
  id_usuario?: number;
}
