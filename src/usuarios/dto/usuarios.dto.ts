import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { UsuarioBaseDto } from './usuario-base.dto';

export class CrearUsuarioDto extends UsuarioBaseDto {
  username: string;
  p_nombre: string;
  p_apellido: string;
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
  p_apellido?: string;

  @ApiPropertyOptional()
  @IsOptional()
  email?: string;

  @ApiPropertyOptional()
  @IsOptional()
  password?: string;
}
