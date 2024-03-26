import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { LibroBaseDto } from './libros-base.dto';

export class CrearLibroDto extends LibroBaseDto {
  nom_libro: string;
  num_pag: number;
  cant_leido: number;
  id_grado: number;
}

export class ActualizarLibroDto extends LibroBaseDto {
  @ApiPropertyOptional()
  @IsOptional()
  nom_libro?: string;

  @ApiPropertyOptional()
  @IsOptional()
  num_pag?: number;

  @ApiPropertyOptional()
  @IsOptional()
  cant_leido?: number;

  @ApiPropertyOptional()
  @IsOptional()
  id_grado?: number;
}
