import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { EstadoCuestionario } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import {
  ActualizarCuestionarioEstudianteDto,
  CrearCuestionarioEstudianteDto,
} from './dto/cuestionario-estudiante.dto';
import { CuestionarioEstudiante } from './entities/cuestionario-estudiante.entity';

@Injectable()
export class CuestionarioEstudianteService {
  constructor(private prisma: PrismaService) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async actualizarEstadoCuestionarioEstudiante() {
    const now = new Date();
    await this.prisma.cuestionarioEstudiante.updateMany({
      where: {
        fecha_entrega: {
          lte: now,
        },
        estado: {
          equals: EstadoCuestionario.PENDIENTE,
        },
      },
      data: {
        estado: EstadoCuestionario.NO_LOGRADO,
      },
    });
  }

  async obtenerCuestionariosEstudiante(): Promise<CuestionarioEstudiante[]> {
    return this.prisma.cuestionarioEstudiante.findMany();
  }

  async contarCuestionariosEstudiantesPorEstado(
    estado: EstadoCuestionario,
  ): Promise<number> {
    return this.prisma.cuestionarioEstudiante.count({
      where: { estado },
    });
  }

  async obtenerEstadisticasSemanalesPorEstado(estado: EstadoCuestionario) {
    /**
     * Quiero obtener el número de cuestionarios completados
     * por semana segun el estado de cuestionario que me manden (COMPLETADO, PENDIENTE) en un array numérico de 7 elementos que
     * representen los 7 días de la semana.
     * tiene que ser de la semana actual mas reciente.
     * Si no hay cuestionarios completados en un dia entonces es 0.
     * Ejemplo de resultado de estad: [12, 23, 2, 6, 0, 2, 5]
     */
    const cuestionarios = await this.prisma.cuestionarioEstudiante.findMany({
      where: {
        estado: estado,
      },
      orderBy: {
        cuestionario: {
          createdAt: 'desc',
        },
      },
      take: 7,
    });

    const estadisticasSemanales = [];

    for (let i = 0; i < 7; i++) {
      const cuestionariosDia = cuestionarios.filter(
        (cuestionario) => cuestionario.fecha_asignado.getDay() === i,
      );

      const cuestionariosDiaCompletados = cuestionariosDia.filter(
        (cuestionario) => cuestionario.estado === estado,
      );

      estadisticasSemanales.push(cuestionariosDiaCompletados.length);
    }

    return estadisticasSemanales;
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
            preguntas: {
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
            cuestionario.cuestionario.preguntas.filter(
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
            preguntas: {
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

    // Obtener el inicio y fin de la semana actual
    const now = new Date();
    const startOfWeekDate = new Date(
      now.setDate(now.getDate() - now.getDay() + 1),
    ); // Suponiendo que la semana empieza el lunes
    const endOfWeekDate = new Date(now.setDate(startOfWeekDate.getDate() + 6));

    const daysOfWeek = [
      'Lunes',
      'Martes',
      'Miércoles',
      'Jueves',
      'Viernes',
      'Sábado',
      'Domingo',
    ];
    const results = Array(7)
      .fill(0)
      .map((_, index) => ({ name: daysOfWeek[index], value: 0 }));

    // Calcular el número de respuestas correctas por día
    cuestionarios.forEach((cuestionarioEstudiante) => {
      const { cuestionario } = cuestionarioEstudiante;
      const { createdAt, respuestas, preguntas } = cuestionario;

      // Convertir createdAt a fecha sin hora
      const createdAtDate = new Date(
        createdAt.getFullYear(),
        createdAt.getMonth(),
        createdAt.getDate(),
      );

      // Filtrar cuestionarios de la semana actual
      if (createdAtDate >= startOfWeekDate && createdAtDate <= endOfWeekDate) {
        // Ajustar índice para empezar con Lunes = 0
        const dayIndex = (createdAtDate.getDay() + 6) % 7;
        let correctAnswers = 0;

        respuestas.forEach((respuesta, index) => {
          if (respuesta.respuesta === preguntas[index].opcion_correcta) {
            correctAnswers += 1;
          }
        });

        results[dayIndex].value += correctAnswers;
      }
    });

    return results;
  }

  async obtenerCuestionarioEstudiantePorEstado(
    id_estudiante: number,
    estado: EstadoCuestionario,
  ) {
    return this.prisma.cuestionarioEstudiante.findMany({
      where: { estado, id_estudiante },
      select: {
        id: true,
        calificacion: true,
        estado: true,
        cuestionario: {
          select: {
            id: true,
            preguntas: {
              include: {
                libros: {
                  select: {
                    nom_libro: true,
                  },
                },
              },
            },
            opciones_respuesta: {
              select: {
                opcion: true,
                respuesta: true,
              },
            },
            respuestas: {
              select: {
                id: true,
                respuesta: true,
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

  async obtenerCuestionariosEstudiantesPorEstado(estado: EstadoCuestionario) {
    return this.prisma.cuestionarioEstudiante.findMany({
      where: { estado },
      select: {
        id: true,
        fecha_asignado: true,
        fecha_entrega: true,
        estado: true,
        calificacion: true,
        cuestionario: {
          select: {
            id: true,
            preguntas: {
              include: {
                libros: {
                  select: {
                    nom_libro: true,
                  },
                },
              },
            },
            opciones_respuesta: {
              select: {
                opcion: true,
                respuesta: true,
              },
            },
            respuestas: {
              select: {
                pregunta: true,
                respuesta: true,
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

  async calificarCuestionarioEstudiante(
    id: number,
    cuestionarioEstudiante: ActualizarCuestionarioEstudianteDto,
  ): Promise<CuestionarioEstudiante> {
    const cuestionarioCalificado =
      await this.prisma.cuestionarioEstudiante.update({
        where: { id },
        data: cuestionarioEstudiante,
        include: {
          estudiante: {
            select: {
              puntaje_total: true,
            },
          },
        },
      });

    const id_estudiante = cuestionarioCalificado.id_estudiante;
    await this.prisma.estudiante.update({
      where: { id: id_estudiante },
      data: {
        puntaje_total: this.sumarPuntajes(
          cuestionarioCalificado.estudiante.puntaje_total,
          cuestionarioEstudiante.calificacion,
        ),
      },
    });

    return cuestionarioCalificado;
  }

  sumarPuntajes(a: any, b: any) {
    return Number(a) + Number(b);
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
