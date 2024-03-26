import { ApiProperty } from '@nestjs/swagger';
import { Libro } from '@prisma/client';
import {
  IsInt,
  IsNotEmpty,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class LibroBaseDto implements Partial<Libro> {
  @ApiProperty({
    title: 'Nombre del libro',
    description: 'El nombre del libro',
    example: 'El libro de la mente',
    minLength: 3,
    maxLength: 100,
  })
  @IsNotEmpty({ message: 'El nombre del libro es requerido' })
  @IsString({ message: 'El nombre del libro debe ser una cadena de texto' })
  @MinLength(3, {
    message: 'El nombre del libro debe tener al menos 3 caracteres',
  })
  @MaxLength(100, {
    message: 'El nombre del libro debe tener menos de 100 caracteres',
  })
  nom_libro?: string;

  @ApiProperty({
    title: 'Número de páginas',
    description: 'El número de páginas del libro',
    example: 100,
    minLength: 1,
    maxLength: 255,
  })
  @IsNotEmpty({ message: 'El número de páginas es requerido' })
  @IsInt({ message: 'El número de páginas debe ser un número entero' })
  @Min(1, { message: 'El número de páginas debe ser mayor o igual a 1' })
  @Max(255, { message: 'El número de páginas debe ser menor o igual a 255' })
  num_pag?: number;

  @ApiProperty({
    title: 'Cantidad de veces leído',
    description: 'La cantidad de veces que el libro ha sido leído',
    example: 5,
    minLength: 0,
    maxLength: 4294967295,
  })
  @IsNotEmpty({ message: 'La cantidad de veces leído es requerido' })
  @IsInt({ message: 'La cantidad de veces leído debe ser un número entero' })
  @Min(0, { message: 'La cantidad de veces leído debe ser mayor o igual a 0' })
  @Max(4294967295, {
    message: 'La cantidad de veces leído debe ser menor o igual a 4294967295', // 2^32 - 1 = 4.294.967.295
  })
  cant_leido?: number;

  @ApiProperty({
    title: 'Id de grado',
    description: 'El id de grado del libro',
    example: 1,
    minLength: 1,
    maxLength: 4294967295,
  })
  @IsNotEmpty({ message: 'El id de grado es requerido' })
  @IsInt({ message: 'El id de grado debe ser un número entero' })
  @Min(1, { message: 'El id de grado debe ser mayor o igual a 1' })
  @Max(4294967295, {
    message: 'El id de grado debe ser menor o igual a 4294967295', // 2^32 - 1 = 4.294.967.295
  })
  id_grado?: number;
}
