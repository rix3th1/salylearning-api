import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
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
  @ApiProperty({
    title: 'Número de pregunta',
    description: 'Número de pregunta sobre el libro leído',
    example: 1,
    minimum: 1,
    maximum: 255,
  })
  @IsNotEmpty({ message: 'El número de pregunta es requerido' })
  @IsInt({ message: 'El número de pregunta debe ser un número entero' })
  @Min(1, { message: 'El número de pregunta debe ser mayor o igual a 1' })
  @Max(255, { message: 'El número de pregunta debe ser menor o igual a 255' })
  num_pregunta: number;

  @ApiProperty({
    title: 'Pregunta',
    description: 'Pregunta sobre el libro leído',
    example: '¿Qué es la programación?',
    minLength: 10,
    maxLength: 200,
  })
  @IsNotEmpty({ message: 'La pregunta es requerida' })
  @IsString({ message: 'La pregunta debe ser una cadena de texto' })
  @MinLength(10, { message: 'La pregunta debe tener al menos 10 caracteres' })
  @MaxLength(200, { message: 'La pregunta debe tener menos de 200 caracteres' })
  pregunta: string;

  @ApiProperty({
    title: 'Respuesta A',
    description: 'Respuesta A sobre la pregunta',
    example: 'La programación es un lenguaje de programación',
    minLength: 3,
    maxLength: 100,
  })
  @IsNotEmpty({ message: 'La respuesta A es requerida' })
  @IsString({ message: 'La respuesta A debe ser una cadena de texto' })
  @MinLength(3, { message: 'La respuesta A debe tener al menos 3 caracteres' })
  @MaxLength(100, {
    message: 'La respuesta A debe tener menos de 100 caracteres',
  })
  resA: string;

  @ApiProperty({
    title: 'Respuesta B',
    description: 'Respuesta B sobre la pregunta',
    example: 'La programación es un proceso de creación de software',
    minLength: 3,
    maxLength: 100,
  })
  @IsNotEmpty({ message: 'La respuesta B es requerida' })
  @IsString({ message: 'La respuesta B debe ser una cadena de texto' })
  @MinLength(3, { message: 'La respuesta B debe tener al menos 3 caracteres' })
  @MaxLength(100, {
    message: 'La respuesta B debe tener menos de 100 caracteres',
  })
  resB: string;

  @ApiProperty({
    title: 'Respuesta C',
    description: 'Respuesta C sobre la pregunta',
    example: 'La programación es un conjunto de instrucciones',
    minLength: 3,
    maxLength: 100,
  })
  @IsNotEmpty({ message: 'La respuesta C es requerida' })
  @IsString({ message: 'La respuesta C debe ser una cadena de texto' })
  @MinLength(3, { message: 'La respuesta C debe tener al menos 3 caracteres' })
  @MaxLength(100, {
    message: 'La respuesta C debe tener menos de 100 caracteres',
  })
  resC: string;

  @ApiProperty({
    title: 'Respuesta D',
    description: 'Respuesta D sobre la pregunta',
    example: 'La programación es una técnica de diseño',
    minLength: 3,
    maxLength: 100,
  })
  @IsNotEmpty({ message: 'La respuesta D es requerida' })
  @IsString({ message: 'La respuesta D debe ser una cadena de texto' })
  @MinLength(3, { message: 'La respuesta D debe tener al menos 3 caracteres' })
  @MaxLength(100, {
    message: 'La respuesta D debe tener menos de 100 caracteres',
  })
  resD: string;

  @ApiProperty({
    title: 'Id del libro',
    description: 'Id del libro al que corresponde las preguntas',
    example: 1,
    minimum: 1,
    maximum: 4294967295, // 2^32 - 1 = 4.294.967.295
  })
  @IsNotEmpty({ message: 'El id de libro es requerido' })
  @IsInt({ message: 'El id de libro debe ser un número entero' })
  @Min(1, { message: 'El id de libro debe ser mayor o igual a 1' })
  @Max(4294967295, {
    message: 'El id de libro debe ser menor o igual a 4294967295', // 2^32 - 1 = 4.294.967.295
  })
  id_libro: number;
}

export class ActualizarPreguntaDto implements Partial<Pregunta> {
  @ApiPropertyOptional({
    title: 'Número de pregunta',
    description: 'Número de pregunta sobre el libro leído',
    example: 1,
    minimum: 1,
    maximum: 255,
  })
  @IsOptional()
  @IsInt({ message: 'El número de pregunta debe ser un número entero' })
  @Min(1, { message: 'El número de pregunta debe ser mayor o igual a 1' })
  @Max(255, { message: 'El número de pregunta debe ser menor o igual a 255' })
  num_pregunta?: number;

  @ApiPropertyOptional({
    title: 'Pregunta',
    description: 'Pregunta sobre el libro leído',
    example: '¿Qué es la programación?',
    minLength: 10,
    maxLength: 200,
  })
  @IsOptional()
  @IsString({ message: 'La pregunta debe ser una cadena de texto' })
  @MinLength(10, { message: 'La pregunta debe tener al menos 10 caracteres' })
  @MaxLength(200, { message: 'La pregunta debe tener menos de 200 caracteres' })
  pregunta?: string;

  @ApiPropertyOptional({
    title: 'Respuesta A',
    description: 'Respuesta A sobre la pregunta',
    example: 'La programación es un lenguaje de programación',
    minLength: 3,
    maxLength: 100,
  })
  @IsOptional()
  @IsString({ message: 'La respuesta A debe ser una cadena de texto' })
  @MinLength(3, { message: 'La respuesta A debe tener al menos 3 caracteres' })
  @MaxLength(100, {
    message: 'La respuesta A debe tener menos de 100 caracteres',
  })
  resA?: string;

  @ApiPropertyOptional({
    title: 'Respuesta B',
    description: 'Respuesta B sobre la pregunta',
    example: 'La programación es un proceso de creación de software',
    minLength: 3,
    maxLength: 100,
  })
  @IsOptional()
  @IsString({ message: 'La respuesta B debe ser una cadena de texto' })
  @MinLength(3, { message: 'La respuesta B debe tener al menos 3 caracteres' })
  @MaxLength(100, {
    message: 'La respuesta B debe tener menos de 100 caracteres',
  })
  resB?: string;

  @ApiPropertyOptional({
    title: 'Respuesta C',
    description: 'Respuesta C sobre la pregunta',
    example: 'La programación es un conjunto de instrucciones',
    minLength: 3,
    maxLength: 100,
  })
  @IsOptional()
  @IsString({ message: 'La respuesta C debe ser una cadena de texto' })
  @MinLength(3, { message: 'La respuesta C debe tener al menos 3 caracteres' })
  @MaxLength(100, {
    message: 'La respuesta C debe tener menos de 100 caracteres',
  })
  resC?: string;

  @ApiPropertyOptional({
    title: 'Respuesta D',
    description: 'Respuesta D sobre la pregunta',
    example: 'La programación es una técnica de diseño',
    minLength: 3,
    maxLength: 100,
  })
  @IsOptional()
  @IsString({ message: 'La respuesta D debe ser una cadena de texto' })
  @MinLength(3, { message: 'La respuesta D debe tener al menos 3 caracteres' })
  @MaxLength(100, {
    message: 'La respuesta D debe tener menos de 100 caracteres',
  })
  resD?: string;

  @ApiPropertyOptional({
    title: 'Id del libro',
    description: 'Id del libro al que corresponde las preguntas',
    example: 1,
    minimum: 1,
    maximum: 4294967295, // 2^32 - 1 = 4.294.967.295
  })
  @IsOptional()
  @IsInt({ message: 'El id de libro debe ser un número entero' })
  @Min(1, { message: 'El id de libro debe ser mayor o igual a 1' })
  @Max(4294967295, {
    message: 'El id de libro debe ser menor o igual a 4294967295', // 2^32 - 1 = 4.294.967.295
  })
  id_libro?: number;
}
