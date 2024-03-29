import { Injectable } from '@nestjs/common';
import { Preguntas } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { ActualizarPreguntaDto, CrearPreguntaDto } from './dto/preguntas.dto';

@Injectable()
export class PreguntasService {
  constructor(private prisma: PrismaService) {}

  async obtenerPreguntas(): Promise<Preguntas[]> {
    return this.prisma.preguntas.findMany();
  }

  async obtenerPregunta(id: number): Promise<Preguntas> {
    return this.prisma.preguntas.findUniqueOrThrow({ where: { id } });
  }

  async crearPregunta(pregunta: CrearPreguntaDto): Promise<Preguntas> {
    return this.prisma.preguntas.create({ data: pregunta });
  }

  async actualizarPregunta(
    id: number,
    pregunta: ActualizarPreguntaDto,
  ): Promise<Preguntas> {
    return this.prisma.preguntas.update({ where: { id }, data: pregunta });
  }

  async eliminarPregunta(id: number): Promise<Preguntas> {
    return this.prisma.preguntas.delete({ where: { id } });
  }
}
