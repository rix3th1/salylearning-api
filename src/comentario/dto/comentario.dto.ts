import { OmitType } from '@nestjs/swagger';
import { Comentario } from '../entities/comentario.entity';
import {
  IsString,
  MinLength,
  MaxLength,
  IsEmail,
  IsMobilePhone,
  IsNotEmpty,
  Length,
} from 'class-validator';

export class CrearComentarioDto extends OmitType(Comentario, ['id'] as const) {
  @IsNotEmpty({ message: 'El nombre completo es requerido' })
  @IsString({ message: 'El nombre completo debe ser una cadena de texto' })
  @MinLength(6, {
    message: 'El nombre completo debe tener al menos 6 caracteres',
  })
  @MaxLength(60, {
    message: 'El nombre completo debe tener menos de 60 caracteres',
  })
  nombre_completo: string;

  @IsNotEmpty({ message: 'El email es requerido' })
  @IsString({ message: 'El email debe ser una cadena de texto' })
  @MinLength(5, { message: 'El email debe tener al menos 5 caracteres' })
  @MaxLength(100, { message: 'El email debe tener menos de 100 caracteres' })
  @IsEmail(undefined, { message: 'El email no es válido' })
  email: string;

  @IsNotEmpty({ message: 'El teléfono es requerido' })
  @IsString({ message: 'El teléfono debe ser una cadena de texto' })
  @Length(10, 10, { message: 'El teléfono debe tener 10 dígitos' })
  //Numero de telefono de 10 digitos de colombia
  @IsMobilePhone('es-CO', undefined, { message: 'El teléfono no es válido' })
  telefono: string;

  @IsNotEmpty({ message: 'El mensaje es requerido' })
  @IsString({ message: 'El mensaje debe ser una cadena de texto' })
  @MinLength(10, { message: 'El mensaje debe tener al menos 10 caracteres' })
  @MaxLength(500, { message: 'El mensaje debe tener menos de 500 caracteres' })
  mensaje: string;
}
