import { ApiProperty } from '@nestjs/swagger';
import { Grado } from '@prisma/client';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class GradoBaseDto implements Partial<Grado> {
  @ApiProperty({
    title: 'Nombre del grado',
    description: 'El nombre del grado',
    example: 'Primaria',
    minLength: 3,
    maxLength: 30,
  })
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
