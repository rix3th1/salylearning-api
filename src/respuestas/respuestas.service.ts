import { Injectable } from '@nestjs/common';
import { EstadoCuestionario } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { ActualizarRespuestaDto, CrearRespuestaDto } from './dto/respuesta.dto';
import { Respuesta } from './entities/respuesta.entity';

@Injectable()
export class RespuestasService {
  constructor(private prisma: PrismaService) {}

  async obtenerRespuestas(): Promise<Respuesta[]> {
    return this.prisma.respuesta.findMany();
  }

  async obtenerRespuesta(id: number): Promise<Respuesta> {
    return this.prisma.respuesta.findUniqueOrThrow({ where: { id } });
  }

  async crearRespuesta(respuesta: CrearRespuestaDto): Promise<Respuesta> {
    return this.prisma.respuesta.create({ data: respuesta });
  }

  async responderPreguntasCuestionario(respuestas: CrearRespuestaDto[]) {
    for (const respuesta of respuestas) {
      const cuestionarioCompletado =
        await this.prisma.cuestionarioEstudiante.update({
          where: {
            id: respuesta.id_cuestionario,
          },
          data: {
            estado: EstadoCuestionario.COMPLETADO,
            fecha_entrega: new Date(),
          },
        });

      respuesta.id_cuestionario = cuestionarioCompletado.id;
    }

    return this.prisma.respuesta.createMany({ data: respuestas });
  }

  async actualizarRespuesta(
    id: number,
    respuesta: ActualizarRespuestaDto,
  ): Promise<Respuesta> {
    return this.prisma.respuesta.update({ where: { id }, data: respuesta });
  }

  async eliminarRespuesta(id: number): Promise<Respuesta> {
    return this.prisma.respuesta.delete({ where: { id } });
  }
}
