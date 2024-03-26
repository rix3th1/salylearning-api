import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { UsuarioBaseDto } from './usuarios-base.dto';

export class CrearUsuarioDto extends UsuarioBaseDto {
  username: string;
  p_nombre: string;
  s_nombre?: string;
  p_apellido: string;
  s_apellido?: string;
  email: string;
  password: string;
}

export class ActualizarUsuarioDto extends UsuarioBaseDto {
  @ApiPropertyOptional()
  @IsOptional()
  username?: string;

  @ApiPropertyOptional()
  @IsOptional()
  p_nombre?: string;

  @ApiPropertyOptional()
  @IsOptional()
  s_nombre?: string;

  @ApiPropertyOptional()
  @IsOptional()
  p_apellido?: string;

  @ApiPropertyOptional()
  @IsOptional()
  s_apellido?: string;

  @ApiPropertyOptional()
  @IsOptional()
  email?: string;

  @ApiPropertyOptional()
  @IsOptional()
  password?: string;
}
