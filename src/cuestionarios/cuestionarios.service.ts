import { Injectable } from '@nestjs/common';
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

  async obtenerCuestionarios(): Promise<Cuestionario[]> {
    return this.prisma.cuestionario.findMany();
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
    const { preguntas, opciones_respuesta } = cuestionario;
    const cuestionarioCreado = await this.prisma.cuestionario.create({
      data: {
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
