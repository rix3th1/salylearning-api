import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { GradoUsuarioBaseDto } from './grado-usuario-base.dto';

export class CrearGradoUsuarioDto extends GradoUsuarioBaseDto {
  id_grado: number;
  id_usuario: number;
}

export class ActualizarGradoUsuarioDto extends GradoUsuarioBaseDto {
  @ApiPropertyOptional()
  @IsOptional()
  id_grado?: number;

  @ApiPropertyOptional()
  @IsOptional()
  id_usuario?: number;
}
