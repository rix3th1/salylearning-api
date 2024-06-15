import { Injectable } from '@nestjs/common';
import { days } from '../constants';
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

  async contarLibrosNoTerminadosEstudiante(
    id_estudiante: number,
  ): Promise<number> {
    return this.prisma.libroEstudiante.count({
      where: { terminado: false, id_estudiante },
    });
  }

  async contarLibrosTerminadosEstudiante(
    id_estudiante: number,
  ): Promise<number> {
    return this.prisma.libroEstudiante.count({
      where: { terminado: true, id_estudiante },
    });
  }

  async obtenerTiempoDeLecturaTotal(id_estudiante: number): Promise<number> {
    /**
     * Quiero obtener el tiempo de lectura total de todos los libros del estudiante.
     * Para ello, primero debo obtener todos los libros del estudiante, no solo los terminados.
     * Luego, cada libro tiene una propiedad que indica el tiempo de lectura de ese libro.
     * Con esto, puedo sumar todos los tiempos de lectura de todos los libros del estudiante.
     * Finalmente, devuelvo el resultado.
     * Ejemplo de resultado:  20.
     */
    const libros = await this.prisma.libroEstudiante.findMany({
      where: { id_estudiante },
      select: { tiempo_lectura: true },
    });

    const tiempoLecturaTotal = libros.reduce(
      (acc, libro) => acc + libro.tiempo_lectura,
      0,
    );

    return tiempoLecturaTotal;
  }

  async obtenerEstadisticasSemanalesProgresoEnLecturaPorEstudiante(
    id_estudiante: number,
  ) {
    /**
     * Quiero obtener el número de tiempo_leido de todos los libros del estudiante
     * por semana sin importar si están terminados o no y sumarlos para obtener el tiempo de lectura total por dia. Esto me
     * permitirá calcular el progreso de lectura semanal. Quiero obtenerlos en un array
     * de objetos con el siguiente formato:
     * [
     *   {
     *     name: "Lunes",
     *     value: 2,
     *   },
     *   {
     *     name: "Martes",
     *     value: 3,
     *   },
     *   {
     *     name: "Miércoles",
     *     value: 4,
     *   },
     *   {
     *     name: "Jueves",
     *     value: 5,
     *   },
     *   {
     *     name: "Viernes",
     *     value: 6,
     *   },
     *   {
     *     name: "Sábado",
     *     value: 7,
     *   },
     *   {
     *     name: "Domingo",
     *     value: 8,
     *   },
     * ]
     * Tienen que ser de la semana actual mas reciente.
     * Si no hay minutos de lectura en un dia entonces el resultado es 0 para ese dia
     * pero debe devolver un array con todos los dias de la semana.
     * Recuerda que si hay mas libros de estudiante en un dia el tiempo de lectura se suma por dia.
     * Y el resultado es el tiempo de lectura total por dia (Osea semanal).
     */
    const libros = await this.prisma.libroEstudiante.findMany({
      where: {
        id_estudiante,
      },
      select: {
        createdAt: true,
        tiempo_lectura: true,
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

      librosDia.forEach((libro) => {
        const tiempoLectura = libro.tiempo_lectura;
        if (tiempoLectura) {
          estadisticasSemanales.push({
            name: this.getDayName(i),
            value: tiempoLectura,
          });
        }
      });

      // Si no hay libros de estudiantes terminados en un dia entonces es 0
      if (librosDia.length === 0) {
        estadisticasSemanales.push({
          name: this.getDayName(i),
          value: 0,
        });
      }
    }

    return estadisticasSemanales;
  }

  getDayName(day: number) {
    return days[day];
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

  async obtenerLibrosPorIdLibro(id_libro: number): Promise<LibroEstudiante> {
    return this.prisma.libroEstudiante.findUniqueOrThrow({
      where: {
        id_libro,
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
