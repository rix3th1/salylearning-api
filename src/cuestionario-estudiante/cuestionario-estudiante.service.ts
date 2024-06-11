import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  ActualizarCuestionarioEstudianteDto,
  CrearCuestionarioEstudianteDto,
} from './dto/cuestionario-estudiante.dto';
import { CuestionarioEstudiante } from './entities/cuestionario-estudiante.entity';
import { EstadoCuestionario } from '@prisma/client';

@Injectable()
export class CuestionarioEstudianteService {
  constructor(private prisma: PrismaService) {}

  async obtenerCuestionariosEstudiante(): Promise<CuestionarioEstudiante[]> {
    return this.prisma.cuestionarioEstudiante.findMany();
  }

  async contarPreguntasCorrectas(id_estudiante: number): Promise<number> {
    /**
     * Quiero obtener el número de preguntas correctas de todos los cuestionarios de estudiantes.
     * En este caso, primero debo obtener todos los cuestionarios de estudiantes
     * incluyendo en la consulta opciones de respuesta y respuestas.
     * Luego, lo que debo hacer sumar cuantas de esas preguntas son correctas.
     * La clave es que en opciones de respuesta está la propiedad opcion_correcta.
     * Entonces lo que debo hacer es sumar todas las que respuesta sea igual a opcion_correcta.
     * Finalmente, devuelvo el resultado.
     * Ejemplo de resultado:  10.
     */
    const cuestionarios = await this.prisma.cuestionarioEstudiante.findMany({
      where: { id_estudiante },
      select: {
        cuestionario: {
          select: {
            respuestas: {
              select: {
                respuesta: true,
              },
            },
            opciones_respuesta: {
              select: {
                opcion_correcta: true,
              },
            },
          },
        },
      },
    });

    const preguntasCorrectas = cuestionarios.reduce(
      (acc, cuestionario) =>
        acc +
        cuestionario.cuestionario.respuestas.reduce(
          (acc, respuesta) =>
            acc +
            cuestionario.cuestionario.opciones_respuesta.filter(
              (opcion) => opcion.opcion_correcta === respuesta.respuesta,
            ).length,
          0,
        ),
      0,
    );

    return preguntasCorrectas;
  }

  async obtenerEstadisticasSemanalesPreguntasCorrectasPorEstudiante(
    id_estudiante: number,
  ) {
    /**
     * Quiero obtener el número de preguntas correctas de todos los cuestionarios de estudiantes por semana sin importar si están terminados o no y sumarlos para obtener el número de preguntas correctas por dia. Esto me
     * permitirá calcular el progreso de las preguntas correctas semanal. Quiero obtenerlos en un array
     * de objetos con el siguiente formato:
     * [
     *   {
     *     name: "Lunes",
     *     value: 2,
     *   },
     *   {
     *     name: "Martes",
     *     value: 3,
     *   },
     *   {
     *     name: "Miércoles",
     *     value: 4,
     *   },
     *   {
     *     name: "Jueves",
     *     value: 5,
     *   },
     *   {
     *     name: "Viernes",
     *     value: 6,
     *   },
     *   {
     *     name: "Sábado",
     *     value: 7,
     *   },
     *   {
     *     name: "Domingo",
     *     value: 8,
     *   },
     * ]
     * Tienen que ser de la semana actual mas reciente.
     * Si no hay preguntas correctas en un dia entonces el resultado es 0 para ese dia
     * pero debe devolver un array con todos los dias de la semana.
     * Recuerda que si hay mas cuestionarios de estudiantes en un dia el número de preguntas correctas se suma por dia.
     * Y el resultado es el número de preguntas correctas total por dia (Osea semanal).
     */
    const cuestionarios = await this.prisma.cuestionarioEstudiante.findMany({
      where: {
        id_estudiante,
      },
      select: {
        cuestionario: {
          select: {
            createdAt: true,
            respuestas: {
              select: {
                respuesta: true,
              },
            },
            opciones_respuesta: {
              select: {
                opcion_correcta: true,
              },
            },
          },
        },
      },
      orderBy: {
        cuestionario: {
          createdAt: 'desc',
        },
      },
      take: 7,
    });

    const preguntasCorrectas = cuestionarios.reduce(
      (acc, cuestionario) =>
        acc +
        cuestionario.cuestionario.respuestas.reduce(
          (acc, respuesta) =>
            acc +
            cuestionario.cuestionario.opciones_respuesta.filter(
              (opcion) => opcion.opcion_correcta === respuesta.respuesta,
            ).length,
          0,
        ),
      0,
    );

    const semanalPreguntasCorrectas = [];

    for (let i = 0; i < 7; i++) {
      const dia = new Date(new Date().setDate(new Date().getDate() - i));
      const diaSemana = dia.getDay();
      const diaSemanaTexto = [
        'Lunes',
        'Martes',
        'Miércoles',
        'Jueves',
        'Viernes',
        'Sábado',
        'Domingo',
      ][diaSemana];
      const diaSemanaPreguntasCorrectas =
        preguntasCorrectas > 0 ? preguntasCorrectas : 0;
      semanalPreguntasCorrectas.push({
        name: diaSemanaTexto,
        value: diaSemanaPreguntasCorrectas,
      });
    }

    return semanalPreguntasCorrectas;
  }

  async obtenerCuestionariosEstudiantesPorEstado(estado: EstadoCuestionario) {
    return this.prisma.cuestionarioEstudiante.findMany({
      where: { cuestionario: { estado } },
      select: {
        cuestionario: {
          select: {
            fecha_asignado: true,
            fecha_entrega: true,
            estado: true,
            preguntas: {
              include: {
                libros: {
                  select: {
                    nom_libro: true,
                  },
                },
              },
            },
          },
        },
        estudiante: {
          select: {
            usuario: {
              select: {
                p_nombre: true,
                p_apellido: true,
                username: true,
                grado_usuario: {
                  select: { grados: { select: { nom_grado: true } } },
                },
              },
            },
          },
        },
      },
    });
  }

  async obtenerCuestionarioEstudiante(
    id: number,
  ): Promise<CuestionarioEstudiante> {
    return this.prisma.cuestionarioEstudiante.findUniqueOrThrow({
      where: { id },
    });
  }

  async crearCuestionarioEstudiante(
    cuestionarioEstudiante: CrearCuestionarioEstudianteDto,
  ): Promise<CuestionarioEstudiante> {
    return this.prisma.cuestionarioEstudiante.create({
      data: cuestionarioEstudiante,
    });
  }

  async asignarCuestionarioEstudianteATodosLosEstudiantes(
    cuestionarioEstudiante: CrearCuestionarioEstudianteDto,
  ): Promise<CuestionarioEstudiante> {
    return this.prisma.cuestionarioEstudiante.create({
      data: cuestionarioEstudiante,
    });
  }

  async actualizarCuestionarioEstudiante(
    id: number,
    cuestionarioEstudiante: ActualizarCuestionarioEstudianteDto,
  ): Promise<CuestionarioEstudiante> {
    return this.prisma.cuestionarioEstudiante.update({
      where: { id },
      data: cuestionarioEstudiante,
    });
  }

  async eliminarCuestionarioEstudiante(
    id: number,
  ): Promise<CuestionarioEstudiante> {
    return this.prisma.cuestionarioEstudiante.delete({ where: { id } });
  }
}
