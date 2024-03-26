import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AvatarUsuario } from '@prisma/client';
import { IsInt, IsNotEmpty, IsOptional, Max, Min } from 'class-validator';

export class CrearAvatarUsuarioDto implements Partial<AvatarUsuario> {
  @ApiProperty()
  @IsNotEmpty({ message: 'El id de avatar es requerido' })
  @IsInt({ message: 'El id de avatar debe ser un número entero' })
  @Min(1, { message: 'El id de avatar debe ser mayor o igual a 1' })
  @Max(4294967295, {
    message: 'El id de avatar debe ser menor o igual a 4294967295', // 2^32 - 1 = 4.294.967.295
  })
  id_avatar: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'El id de usuario es requerido' })
  @IsInt({ message: 'El id de usuario debe ser un número entero' })
  @Min(1, { message: 'El id de usuario debe ser mayor o igual a 1' })
  @Max(4294967295, {
    message: 'El id de usuario debe ser menor o igual a 4294967295', // 2^32 - 1 = 4.294.967.295
  })
  id_usuario: number;
}

export class ActualizarAvatarUsuarioDto implements Partial<AvatarUsuario> {
  @ApiPropertyOptional()
  @IsOptional()
  @IsInt({ message: 'El id de avatar debe ser un número entero' })
  @Min(1, { message: 'El id de avatar debe ser mayor o igual a 1' })
  @Max(4294967295, {
    message: 'El id de avatar debe ser menor o igual a 4294967295', // 2^32 - 1 = 4.294.967.295
  })
  id_avatar?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt({ message: 'El id de usuario debe ser un número entero' })
  @Min(1, { message: 'El id de usuario debe ser mayor o igual a 1' })
  @Max(4294967295, {
    message: 'El id de usuario debe ser menor o igual a 4294967295', // 2^32 - 1 = 4.294.967.295
  })
  id_usuario?: number;
}
