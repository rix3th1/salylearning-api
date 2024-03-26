import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { PreguntaBaseDto } from './preguntas-base.dto';

export class CrearPreguntaDto extends PreguntaBaseDto {
  num_pregunta: number;
  pregunta: string;
  resA: string;
  resB: string;
  resC: string;
  resD: string;
  id_libro: number;
}

export class ActualizarPreguntaDto extends PreguntaBaseDto {
  @ApiPropertyOptional()
  @IsOptional()
  num_pregunta?: number;

  @ApiPropertyOptional()
  @IsOptional()
  pregunta?: string;

  @ApiPropertyOptional()
  @IsOptional()
  resA?: string;

  @ApiPropertyOptional()
  @IsOptional()
  resB?: string;

  @ApiPropertyOptional()
  @IsOptional()
  resC?: string;

  @ApiPropertyOptional()
  @IsOptional()
  resD?: string;

  @ApiPropertyOptional()
  @IsOptional()
  id_libro?: number;
}
