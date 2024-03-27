import { Injectable } from '@nestjs/common';
import { Libro } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { ActualizarLibroDto, CrearLibroDto } from './dto/libros.dto';

@Injectable()
export class LibrosService {
  constructor(private prisma: PrismaService) {}

  async obtenerLibros(): Promise<Libro[]> {
    return this.prisma.libro.findMany();
  }

  async obtenerLibroPorId(id: number): Promise<Libro> {
    return this.prisma.libro.findUniqueOrThrow({ where: { id } });
  }

  async crearLibro(libro: CrearLibroDto): Promise<Libro> {
    return this.prisma.libro.create({ data: libro });
  }

  async actualizarLibro(id: number, libro: ActualizarLibroDto): Promise<Libro> {
    return this.prisma.libro.update({ where: { id }, data: libro });
  }

  async eliminarLibro(id: number): Promise<Libro> {
    return this.prisma.libro.delete({ where: { id } });
  }
}
