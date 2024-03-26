import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { MiLibroBaseDto } from './mi-libro-base.dto';

export class CrearMiLibroDto extends MiLibroBaseDto {
  id_libro: number;
  id_usuario: number;
  terminado: boolean;
}

export class ActualizarMiLibroDto extends MiLibroBaseDto {
  @ApiPropertyOptional()
  @IsOptional()
  id_libro?: number;

  @ApiPropertyOptional()
  @IsOptional()
  id_usuario?: number;

  @ApiPropertyOptional()
  @IsOptional()
  terminado?: boolean;
}
