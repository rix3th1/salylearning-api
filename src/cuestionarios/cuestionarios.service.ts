import { Injectable } from '@nestjs/common';
import { EstadoCuestionario } from '@prisma/client';
import { OpcionRespuesta } from '../opciones-respuesta/entities/opcion-respuesta.entity';
import { PrismaService } from '../prisma/prisma.service';
import {
  ActualizarCuestionarioDto,
  CrearCuestionarioDto,
  crearCuestionarioConPreguntasDto,
} from './dto/cuestionario.dto';
import { Cuestionario } from './entities/cuestionario.entity';

@Injectable()
export class CuestionariosService {
  constructor(private prisma: PrismaService) {}

  async contarCuestionarios(): Promise<number> {
    return this.prisma.cuestionario.count();
  }

  async contarCuestionariosPorEstado(
    estado: EstadoCuestionario,
  ): Promise<number> {
    return this.prisma.cuestionario.count({ where: { estado } });
  }

  async obtenerCuestionarios(): Promise<Cuestionario[]> {
    return this.prisma.cuestionario.findMany();
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
    const cuestionarios = await this.prisma.cuestionario.findMany({
      where: {
        estado: estado,
      },
      orderBy: {
        createdAt: 'desc',
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

  async obtenerCuestionariosPorEstado(estado: EstadoCuestionario) {
    return this.prisma.cuestionario.findMany({
      where: { estado },
      select: {
        id: true,
        fecha_asignado: true,
        fecha_entrega: true,
        estado: true,
        preguntas: {
          select: {
            pregunta: true,
            libros: {
              select: {
                nom_libro: true,
                mis_libros: {
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
            },
          },
        },
        opciones_respuesta: {
          select: {
            opcion: true,
            respuesta: true,
          },
        },
      },
    });
  }

  async obtenerCuestionario(id: number): Promise<Cuestionario> {
    return this.prisma.cuestionario.findUniqueOrThrow({ where: { id } });
  }

  async crearCuestionario(
    cuestionario: CrearCuestionarioDto,
  ): Promise<Cuestionario> {
    return this.prisma.cuestionario.create({ data: cuestionario });
  }

  async crearCuestionarioConPreguntas(
    cuestionario: crearCuestionarioConPreguntasDto,
  ): Promise<Cuestionario> {
    const { preguntas, opciones_respuesta, ...rest } = cuestionario;
    const cuestionarioCreado = await this.prisma.cuestionario.create({
      data: {
        ...rest,
        preguntas: {
          create: preguntas,
        },
      },
    });

    const id_cuestionario = cuestionarioCreado.id;

    for (const opcionRespuesta of opciones_respuesta) {
      for (const opcion of opcionRespuesta as unknown as OpcionRespuesta[]) {
        opcion.id_cuestionario = id_cuestionario;
      }

      await this.prisma.opcionRespuesta.createMany({
        data: opcionRespuesta,
      });
    }

    return cuestionarioCreado;
  }

  async actualizarCuestionario(
    id: number,
    cuestionario: ActualizarCuestionarioDto,
  ): Promise<Cuestionario> {
    return this.prisma.cuestionario.update({
      where: { id },
      data: cuestionario,
    });
  }

  async eliminarCuestionario(id: number): Promise<Cuestionario> {
    return this.prisma.cuestionario.delete({ where: { id } });
  }
}
