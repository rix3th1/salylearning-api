import { Injectable } from '@nestjs/common';
import { Libro } from '@prisma/client';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { PrismaService } from '../prisma/prisma.service';
import { ActualizarLibroDto, CrearLibroDto } from './dto/libros.dto';

@Injectable()
export class LibrosService {
  constructor(
    private prisma: PrismaService,
    private cloudinary: CloudinaryService,
  ) {}

  async obtenerLibros(): Promise<Libro[]> {
    return this.prisma.libro.findMany();
  }

  async obtenerLibrosPorNombre(nom_libro: string): Promise<Libro[]> {
    return this.prisma.libro.findMany({
      where: { nom_libro: { contains: nom_libro } },
    });
  }

  async obtenerLibroPorId(id: number): Promise<Libro> {
    return this.prisma.libro.findUniqueOrThrow({ where: { id } });
  }

  async crearLibro(libro: CrearLibroDto): Promise<Libro> {
    return this.prisma.libro.create({ data: libro });
  }

  async subirPortadaLibro(imagen_portada: Express.Multer.File) {
    return this.cloudinary.subirImagen(imagen_portada);
  }

  async eliminarPortadaLibro(public_id: string) {
    return this.cloudinary.eliminarImagen(public_id);
  }

  async actualizarLibro(id: number, libro: ActualizarLibroDto): Promise<Libro> {
    return this.prisma.libro.update({ where: { id }, data: libro });
  }

  async eliminarLibro(id: number): Promise<Libro> {
    return this.prisma.libro.delete({ where: { id } });
  }
}
