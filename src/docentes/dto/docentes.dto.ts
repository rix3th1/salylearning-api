import { ApiPropertyOptional, OmitType, PartialType } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';
import { Docente } from '../entities/docente.entity';

export class CrearDocenteDto extends OmitType(Docente, ['id'] as const) {
  @IsNotEmpty({ message: 'El id de usuario es requerido' })
  @IsInt({ message: 'El id de usuario debe ser un número entero' })
  @Min(1, { message: 'El id de usuario debe ser mayor o igual a 1' })
  @Max(4294967295, {
    message: 'El id de usuario debe ser menor o igual a 4294967295', // 2^32 - 1 = 4.294.967.295
  })
  id_usuario: number;

  @IsNotEmpty({ message: 'El código del docente es requerido' })
  @IsString({ message: 'El código del docente debe ser una cadena de texto' })
  @Length(6, 6, { message: 'El código del docente debe tener 6 caracteres' })
  cod_docente: string;
}

export class ActualizarDocenteDto extends PartialType(CrearDocenteDto) {
  @ApiPropertyOptional()
  @IsOptional()
  id_usuario?: number;

  @ApiPropertyOptional()
  @IsOptional()
  cod_docente?: string;
}
