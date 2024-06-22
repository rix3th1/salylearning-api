import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ReportesPdfService {
  constructor(private prisma: PrismaService) {}

  async obtenerCalificacionesEstudiantesPorGrado(id_grado: number) {
    return this.prisma.usuario.findMany({
      where: {
        grado_usuario: {
          id_grado,
        },
      },
      include: {
        estudiante: {
          include: {
            cuestionario_estudiante: true,
          },
        },
      },
    });
  }
}
