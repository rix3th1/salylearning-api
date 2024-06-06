import { Injectable } from '@nestjs/common';
import { EstadoCuestionario } from '@prisma/client';
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

  async obtenerCuestionariosPorEstado(estado: EstadoCuestionario) {
    return this.prisma.cuestionario.findMany({
      where: { estado },
      select: {
        fecha_asignado: true,
        fecha_entrega: true,
        estado: true,
        preguntas: {
          select: {
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
    const { preguntas, ...rest } = cuestionario;
    return this.prisma.cuestionario.create({
      data: { ...rest, preguntas: { create: preguntas } },
    });
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
