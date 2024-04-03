import { ApiPropertyOptional, OmitType, PartialType } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { Libro } from '../entities/libro.entity';
import { Transform } from 'class-transformer';

export class CrearLibroDto extends OmitType(Libro, ['id'] as const) {
  @IsNotEmpty({ message: 'El nombre del libro es requerido' })
  @IsString({ message: 'El nombre del libro debe ser una cadena de texto' })
  @MinLength(3, {
    message: 'El nombre del libro debe tener al menos 3 caracteres',
  })
  @MaxLength(100, {
    message: 'El nombre del libro debe tener menos de 100 caracteres',
  })
  nom_libro: string;

  @IsNotEmpty({ message: 'El número de páginas es requerido' })
  @IsInt({ message: 'El número de páginas debe ser un número entero' })
  @Min(1, { message: 'El número de páginas debe ser mayor o igual a 1' })
  @Max(255, { message: 'El número de páginas debe ser menor o igual a 255' })
  @Transform(({ value: num_pag }) => parseInt(num_pag))
  num_pag: number;

  @IsNotEmpty({ message: 'La cantidad de veces leído es requerido' })
  @IsInt({ message: 'La cantidad de veces leído debe ser un número entero' })
  @Min(0, { message: 'La cantidad de veces leído debe ser mayor o igual a 0' })
  @Max(4294967295, {
    message: 'La cantidad de veces leído debe ser menor o igual a 4294967295', // 2^32 - 1 = 4.294.967.295
  })
  @Transform(({ value: cant_leido }) => parseInt(cant_leido))
  cant_leido: number;

  // @IsNotEmpty({ message: 'La imagen de portada es requerida' })
  // @IsString({ message: 'La imagen de portada debe ser una cadena de texto' })
  imagen_portada: string;

  @IsNotEmpty({ message: 'La url del libro es requerida' })
  @IsString({ message: 'La url del libro debe ser una cadena de texto' })
  @MinLength(3, {
    message: 'La url del libro debe tener al menos 3 caracteres',
  })
  @MaxLength(255, {
    message: 'La url del libro debe tener menos de 255 caracteres',
  })
  url_libro: string;

  @IsNotEmpty({ message: 'El id de grado es requerido' })
  @IsInt({ message: 'El id de grado debe ser un número entero' })
  @Min(1, { message: 'El id de grado debe ser mayor o igual a 1' })
  @Max(4294967295, {
    message: 'El id de grado debe ser menor o igual a 4294967295', // 2^32 - 1 = 4.294.967.295
  })
  @Transform(({ value: id_grado }) => parseInt(id_grado))
  id_grado: number;
}

export class ActualizarLibroDto extends PartialType(CrearLibroDto) {
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
  imagen_portada?: string;

  @ApiPropertyOptional()
  @IsOptional()
  url_libro?: string;

  @ApiPropertyOptional()
  @IsOptional()
  id_grado?: number;
}
