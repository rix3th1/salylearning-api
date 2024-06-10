import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  ActualizarEstudianteDto,
  CrearEstudianteDto,
} from './dto/estudiantes.dto';
import { Estudiante } from './entities/estudiante.entity';

@Injectable()
export class EstudiantesService {
  constructor(private prisma: PrismaService) {}

  async obtenerEstudiantes(): Promise<Estudiante[]> {
    return this.prisma.estudiante.findMany({
      include: {
        usuario: true,
        cuestionario_estudiante: true,
      },
    });
  }

  async obtenerEstudiante(id: number): Promise<Estudiante> {
    return this.prisma.estudiante.findUniqueOrThrow({ where: { id } });
  }

  async obtenerEstudiantePorIdUsuario(id_usuario: number): Promise<Estudiante> {
    return this.prisma.estudiante.findUniqueOrThrow({ where: { id_usuario } });
  }

  async crearEstudiante(estudiante: CrearEstudianteDto): Promise<Estudiante> {
    return this.prisma.estudiante.create({ data: estudiante });
  }

  async actualizarEstudiante(
    id: number,
    estudiante: ActualizarEstudianteDto,
  ): Promise<Estudiante> {
    return this.prisma.estudiante.update({ where: { id }, data: estudiante });
  }

  async eliminarEstudiante(id: number): Promise<Estudiante> {
    return this.prisma.estudiante.delete({ where: { id } });
  }
}
