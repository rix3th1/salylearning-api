import {
  IsInt,
  IsNotEmpty,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { LibroSinId } from '../entities/libro.entity';

export class LibroBaseDto extends LibroSinId {
  @IsNotEmpty({ message: 'El nombre del libro es requerido' })
  @IsString({ message: 'El nombre del libro debe ser una cadena de texto' })
  @MinLength(3, {
    message: 'El nombre del libro debe tener al menos 3 caracteres',
  })
  @MaxLength(100, {
    message: 'El nombre del libro debe tener menos de 100 caracteres',
  })
  nom_libro?: string;

  @IsNotEmpty({ message: 'El número de páginas es requerido' })
  @IsInt({ message: 'El número de páginas debe ser un número entero' })
  @Min(1, { message: 'El número de páginas debe ser mayor o igual a 1' })
  @Max(255, { message: 'El número de páginas debe ser menor o igual a 255' })
  num_pag?: number;

  @IsNotEmpty({ message: 'La cantidad de veces leído es requerido' })
  @IsInt({ message: 'La cantidad de veces leído debe ser un número entero' })
  @Min(0, { message: 'La cantidad de veces leído debe ser mayor o igual a 0' })
  @Max(4294967295, {
    message: 'La cantidad de veces leído debe ser menor o igual a 4294967295', // 2^32 - 1 = 4.294.967.295
  })
  cant_leido?: number;

  @IsNotEmpty({ message: 'El id de grado es requerido' })
  @IsInt({ message: 'El id de grado debe ser un número entero' })
  @Min(1, { message: 'El id de grado debe ser mayor o igual a 1' })
  @Max(4294967295, {
    message: 'El id de grado debe ser menor o igual a 4294967295', // 2^32 - 1 = 4.294.967.295
  })
  id_grado?: number;
}
