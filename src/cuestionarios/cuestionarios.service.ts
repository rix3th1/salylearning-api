import { Injectable } from '@nestjs/common';
import { EstadoCuestionario } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import {
  ActualizarCuestionarioDto,
  CrearCuestionarioDto,
} from './dto/cuestionario.dto';
import { Cuestionario } from './entities/cuestionario.entity';

@Injectable()
export class CuestionariosService {
  constructor(private prisma: PrismaService) {}

  async contarCuestionarios(): Promise<number> {
    return this.prisma.cuestionario.count();
  }

  async contarCuestionariosPendientes(): Promise<number> {
    return this.prisma.cuestionario.count({
      where: { estado: EstadoCuestionario.PENDIENTE },
    });
  }

  async contarCuestionariosNoLogrados(): Promise<number> {
    return this.prisma.cuestionario.count({
      where: { estado: EstadoCuestionario.NO_LOGRADO },
    });
  }

  async contarCuestionariosCompletados(): Promise<number> {
    return this.prisma.cuestionario.count({
      where: { estado: EstadoCuestionario.COMPLETADO },
    });
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
                mis_libros: {
                  select: {
                    libros: { select: { nom_libro: true } },
                    usuario: {
                      select: {
                        p_nombre: true,
                        p_apellido: true,
                        grado_usuario: true,
                        username: true,
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
