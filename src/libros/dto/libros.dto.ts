import { ApiPropertyOptional, OmitType, PartialType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsDateString,
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

  @IsNotEmpty({ message: 'El autor del libro es requerido' })
  @IsString({ message: 'El autor del libro debe ser una cadena de texto' })
  @MinLength(3, {
    message: 'El autor del libro debe tener al menos 3 caracteres',
  })
  @MaxLength(100, {
    message: 'El autor del libro debe tener menos de 100 caracteres',
  })
  autor: string;

  @IsNotEmpty({ message: 'La editorial del libro es requerida' })
  @IsString({ message: 'La editorial del libro debe ser una cadena de texto' })
  @MinLength(3, {
    message: 'La editorial del libro debe tener al menos 3 caracteres',
  })
  @MaxLength(50, {
    message: 'La editorial del libro debe tener menos de 50 caracteres',
  })
  editorial: string;

  @IsNotEmpty({ message: 'La url de más información del libro es requerida' })
  @IsString({
    message: 'La url de más información del libro debe ser una cadena de texto',
  })
  @MinLength(3, {
    message:
      'La url de más información del libro debe tener al menos 3 caracteres',
  })
  @MaxLength(255, {
    message:
      'La url de más información del libro debe tener menos de 255 caracteres',
  })
  url_info: string;

  @IsNotEmpty({ message: 'La fecha de publicación del libro es requerida' })
  @IsString({
    message: 'La fecha de publicación del libro debe ser una cadena de texto',
  })
  @IsDateString(undefined, {
    message: 'La fecha de publicación del libro debe ser una fecha',
  })
  fecha_pub: Date;

  @IsNotEmpty({ message: 'El id del género literario es requerido' })
  @IsInt({ message: 'El id del género literario debe ser un número entero' })
  @Min(1, { message: 'El id del género literario debe ser mayor o igual a 1' })
  @Max(4294967295, {
    message: 'El id del género literario debe ser menor o igual a 4294967295', // 2^32 - 1 = 4.294.967.295
  })
  @Transform(({ value: id_genero_literario }) => parseInt(id_genero_literario))
  id_genero_literario: number;

  @IsNotEmpty({ message: 'La cantidad de veces leído es requerido' })
  @IsInt({ message: 'La cantidad de veces leído debe ser un número entero' })
  @Min(0, { message: 'La cantidad de veces leído debe ser mayor o igual a 0' })
  @Max(4294967295, {
    message: 'La cantidad de veces leído debe ser menor o igual a 4294967295', // 2^32 - 1 = 4.294.967.295
  })
  @Transform(({ value: cant_leido }) => parseInt(cant_leido))
  cant_leido: number;

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
  autor?: string;

  @ApiPropertyOptional()
  @IsOptional()
  editorial?: string;

  @ApiPropertyOptional()
  @IsOptional()
  url_info?: string;

  @ApiPropertyOptional()
  @IsOptional()
  fecha_pub?: Date;

  @ApiPropertyOptional()
  @IsOptional()
  id_genero_literario?: number;

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
