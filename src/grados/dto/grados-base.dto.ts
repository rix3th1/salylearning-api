import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { Grado } from '../entities/grado.entity';

export abstract class GradoBaseDto extends Grado {
  @IsNotEmpty({ message: 'El nombre del grado es requerido' })
  @IsString({ message: 'El nombre del grado debe ser una cadena de texto' })
  @MinLength(3, {
    message: 'El nombre del grado debe tener al menos 3 caracteres',
  })
  @MaxLength(30, {
    message: 'El nombre del grado no puede tener más de 30 caracteres',
  })
  nom_grado?: string;
}
