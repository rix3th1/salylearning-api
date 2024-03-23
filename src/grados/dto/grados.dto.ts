import { Grado } from '@prisma/client';
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

export class CrearGradoDto implements Partial<Grado> {
  @IsNotEmpty({ message: 'El nombre del grado es requerido' })
  @IsString({ message: 'El nombre del grado debe ser una cadena de texto' })
  @MinLength(3, {
    message: 'El nombre del grado debe tener al menos 3 caracteres',
  })
  @MaxLength(30, {
    message: 'El nombre del grado no puede tener más de 30 caracteres',
  })
  nom_grado: string;
}

export class ActualizarGradoDto implements Partial<Grado> {
  @IsOptional()
  @IsString({ message: 'El nombre del grado debe ser una cadena de texto' })
  @MinLength(3, {
    message: 'El nombre del grado debe tener al menos 3 caracteres',
  })
  @MaxLength(30, {
    message: 'El nombre del grado no puede tener más de 30 caracteres',
  })
  nom_grado?: string;
}
