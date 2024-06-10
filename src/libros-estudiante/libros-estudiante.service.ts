import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  ActualizarLibroEstudianteDto,
  CrearLibroEstudianteDto,
} from './dto/libros-estudiante.dto';
import { LibroEstudiante } from './entities/libros-estudiante.entity';

@Injectable()
export class LibrosEstudianteService {
  constructor(private prisma: PrismaService) {}

  async contarLibrosEstudiante(): Promise<number> {
    return this.prisma.libroEstudiante.count();
  }

  async obtenerLibrosPorIdEstudiante(
    id_estudiante: number,
  ): Promise<LibroEstudiante> {
    return this.prisma.libroEstudiante.findUniqueOrThrow({
      where: {
        id_estudiante,
      },
    });
  }

  async obtenerLibrosEstudiante(): Promise<LibroEstudiante[]> {
    return this.prisma.libroEstudiante.findMany();
  }

  async obtenerLibroEstudiante(id: number): Promise<LibroEstudiante> {
    return this.prisma.libroEstudiante.findUniqueOrThrow({ where: { id } });
  }

  async crearLibroEstudiante(
    libroEstudiante: CrearLibroEstudianteDto,
  ): Promise<LibroEstudiante> {
    return this.prisma.libroEstudiante.create({ data: libroEstudiante });
  }

  async actualizarLibroEstudiante(
    id: number,
    libroEstudiante: ActualizarLibroEstudianteDto,
  ): Promise<LibroEstudiante> {
    return this.prisma.libroEstudiante.update({
      where: { id },
      data: libroEstudiante,
    });
  }

  async eliminarLibroEstudiante(id: number): Promise<LibroEstudiante> {
    return this.prisma.libroEstudiante.delete({ where: { id } });
  }
}
