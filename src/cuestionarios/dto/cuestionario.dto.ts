import { IntersectionType, OmitType, PartialType } from '@nestjs/swagger';
import { IsArray, IsNotEmpty } from 'class-validator';
import { OpcionRespuesta } from '../../opciones-respuesta/entities/opcion-respuesta.entity';
import { Pregunta } from '../../preguntas/entities/pregunta.entity';
import {
  Cuestionario,
  CuestionarioAsignacion,
} from '../entities/cuestionario.entity';

export class CrearCuestionarioDto extends OmitType(Cuestionario, [
  'id',
] as const) {}

export class ActualizarCuestionarioDto extends PartialType(
  CrearCuestionarioDto,
) {}

export class crearCuestionarioConPreguntasDto extends IntersectionType(
  CrearCuestionarioDto,
  CuestionarioAsignacion,
) {
  @IsArray({
    message: 'Las preguntas del cuestionario deben ser un arreglo de números',
  })
  @IsNotEmpty({
    message: 'Las preguntas del cuestionario no pueden estar vacías',
  })
  declare preguntas: Pregunta[];

  @IsArray({
    message:
      'Las opciones de respuesta del cuestionario deben ser un arreglo de objetos',
  })
  @IsNotEmpty({
    message:
      'Las opciones de respuesta del cuestionario no pueden estar vacías',
  })
  declare opciones_respuesta: OpcionRespuesta[];
}
