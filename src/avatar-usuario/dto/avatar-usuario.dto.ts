import { ApiPropertyOptional, OmitType, PartialType } from '@nestjs/swagger';
import { IsInt, IsOptional, Max, Min } from 'class-validator';
import { AvatarUsuario } from '../entities/avatar-usuario.entity';

export class CrearAvatarUsuarioDto extends OmitType(AvatarUsuario, [
  'id',
] as const) {
  @IsInt({ message: 'El id de avatar debe ser un número entero' })
  @Min(1, { message: 'El id de avatar debe ser mayor o igual a 1' })
  @Max(4294967295, {
    message: 'El id de avatar debe ser menor o igual a 4294967295', // 2^32 - 1 = 4.294.967.295
  })
  id_avatar: number;

  @IsInt({ message: 'El id de usuario debe ser un número entero' })
  @Min(1, { message: 'El id de usuario debe ser mayor o igual a 1' })
  @Max(4294967295, {
    message: 'El id de usuario debe ser menor o igual a 4294967295', // 2^32 - 1 = 4.294.967.295
  })
  id_usuario: number;
}

export class ActualizarAvatarUsuarioDto extends PartialType(
  CrearAvatarUsuarioDto,
) {
  @ApiPropertyOptional()
  @IsOptional()
  id_avatar?: number;

  @ApiPropertyOptional()
  @IsOptional()
  id_usuario?: number;
}
