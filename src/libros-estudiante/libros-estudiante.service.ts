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

  async obtenerEstadisticasSemanalesLibrosEstudianteTerminados(
    terminado: boolean,
  ) {
    /**
     * Quiero obtener el número de libros de estudiantes segun si estan terminados o no
     * por semana según el booleano que me manden (true, false) en un array numérico de 7 elementos que
     * representen los 7 días de la semana.
     * tiene que ser de la semana actual mas reciente.
     * Si no hay libros de estudiantes terminados en un dia entonces es 0.
     * Ejemplo de resultado:  [4, 24, 0, 0, 7, 2, 3]
     */
    const libros = await this.prisma.libroEstudiante.findMany({
      where: {
        terminado,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 7,
    });

    const estadisticasSemanales = [];

    for (let i = 0; i < 7; i++) {
      const librosDia = libros.filter(
        (libro) => libro.createdAt.getDay() === i,
      );

      const librosDiaTerminados = librosDia.filter((libro) => libro.terminado);

      estadisticasSemanales.push(librosDiaTerminados.length);
    }

    return estadisticasSemanales;
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
