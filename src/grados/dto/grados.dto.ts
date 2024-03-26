import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { GradoBaseDto } from './grados-base.dto';

export class CrearGradoDto extends GradoBaseDto {
  nom_grado: string;
}

export class ActualizarGradoDto extends GradoBaseDto {
  @ApiPropertyOptional()
  @IsOptional()
  nom_grado?: string;
}
