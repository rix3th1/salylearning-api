import { Pregunta } from '@prisma/client';
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

export class CrearPreguntaDto implements Partial<Pregunta> {
  @IsNotEmpty({ message: 'El número de pregunta es requerido' })
  @IsInt({ message: 'El número de pregunta debe ser un número entero' })
  @Min(1, { message: 'El número de pregunta debe ser mayor o igual a 1' })
  @Max(255, { message: 'El número de pregunta debe ser menor o igual a 255' })
  num_pregunta: number;

  @IsNotEmpty({ message: 'La pregunta es requerida' })
  @IsString({ message: 'La pregunta debe ser una cadena de texto' })
  @MinLength(10, { message: 'La pregunta debe tener al menos 10 caracteres' })
  @MaxLength(200, { message: 'La pregunta debe tener menos de 200 caracteres' })
  pregunta: string;

  @IsNotEmpty({ message: 'La respuesta A es requerida' })
  @IsString({ message: 'La respuesta A debe ser una cadena de texto' })
  @MinLength(3, { message: 'La respuesta A debe tener al menos 3 caracteres' })
  @MaxLength(100, {
    message: 'La respuesta A debe tener menos de 100 caracteres',
  })
  resA: string;

  @IsNotEmpty({ message: 'La respuesta B es requerida' })
  @IsString({ message: 'La respuesta B debe ser una cadena de texto' })
  @MinLength(3, { message: 'La respuesta B debe tener al menos 3 caracteres' })
  @MaxLength(100, {
    message: 'La respuesta B debe tener menos de 100 caracteres',
  })
  resB: string;

  @IsNotEmpty({ message: 'La respuesta C es requerida' })
  @IsString({ message: 'La respuesta C debe ser una cadena de texto' })
  @MinLength(3, { message: 'La respuesta C debe tener al menos 3 caracteres' })
  @MaxLength(100, {
    message: 'La respuesta C debe tener menos de 100 caracteres',
  })
  resC: string;

  @IsNotEmpty({ message: 'La respuesta D es requerida' })
  @IsString({ message: 'La respuesta D debe ser una cadena de texto' })
  @MinLength(3, { message: 'La respuesta D debe tener al menos 3 caracteres' })
  @MaxLength(100, {
    message: 'La respuesta D debe tener menos de 100 caracteres',
  })
  resD: string;

  @IsNotEmpty({ message: 'El id de libro es requerido' })
  @IsInt({ message: 'El id de libro debe ser un número entero' })
  @Min(1, { message: 'El id de libro debe ser mayor o igual a 1' })
  @Max(4294967295, {
    message: 'El id de libro debe ser menor o igual a 4294967295', // 2^32 - 1 = 4.294.967.295
  })
  id_libro: number;
}

export class ActualizarPreguntaDto implements Partial<Pregunta> {
  @IsOptional()
  @IsInt({ message: 'El número de pregunta debe ser un número entero' })
  @Min(1, { message: 'El número de pregunta debe ser mayor o igual a 1' })
  @Max(255, { message: 'El número de pregunta debe ser menor o igual a 255' })
  num_pregunta?: number;

  @IsOptional()
  @IsString({ message: 'La pregunta debe ser una cadena de texto' })
  @MinLength(10, { message: 'La pregunta debe tener al menos 10 caracteres' })
  @MaxLength(200, { message: 'La pregunta debe tener menos de 200 caracteres' })
  pregunta?: string;

  @IsOptional()
  @IsString({ message: 'La respuesta A debe ser una cadena de texto' })
  @MinLength(3, { message: 'La respuesta A debe tener al menos 3 caracteres' })
  @MaxLength(100, {
    message: 'La respuesta A debe tener menos de 100 caracteres',
  })
  resA?: string;

  @IsOptional()
  @IsString({ message: 'La respuesta B debe ser una cadena de texto' })
  @MinLength(3, { message: 'La respuesta B debe tener al menos 3 caracteres' })
  @MaxLength(100, {
    message: 'La respuesta B debe tener menos de 100 caracteres',
  })
  resB?: string;

  @IsOptional()
  @IsString({ message: 'La respuesta C debe ser una cadena de texto' })
  @MinLength(3, { message: 'La respuesta C debe tener al menos 3 caracteres' })
  @MaxLength(100, {
    message: 'La respuesta C debe tener menos de 100 caracteres',
  })
  resC?: string;

  @IsOptional()
  @IsString({ message: 'La respuesta D debe ser una cadena de texto' })
  @MinLength(3, { message: 'La respuesta D debe tener al menos 3 caracteres' })
  @MaxLength(100, {
    message: 'La respuesta D debe tener menos de 100 caracteres',
  })
  resD?: string;

  @IsOptional()
  @IsInt({ message: 'El id de libro debe ser un número entero' })
  @Min(1, { message: 'El id de libro debe ser mayor o igual a 1' })
  @Max(4294967295, {
    message: 'El id de libro debe ser menor o igual a 4294967295', // 2^32 - 1 = 4.294.967.295
  })
  id_libro?: number;
}
