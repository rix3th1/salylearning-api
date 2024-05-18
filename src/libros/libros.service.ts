import { Injectable } from '@nestjs/common';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { PrismaService } from '../prisma/prisma.service';
import { ActualizarLibroDto, CrearLibroDto } from './dto/libros.dto';
import { Libro } from './entities/libro.entity';

@Injectable()
export class LibrosService {
  constructor(
    private prisma: PrismaService,
    private cloudinary: CloudinaryService,
  ) {}

  async contarLibros(): Promise<number> {
    return this.prisma.libro.count();
  }

  async obtenerLibros(): Promise<Libro[]> {
    return this.prisma.libro.findMany();
  }

  async obtenerLibrosPorNombre(nom_libro: string): Promise<Libro[]> {
    return this.prisma.libro.findMany({
      where: { nom_libro: { contains: nom_libro } },
    });
  }

  async obtenerLibrosPorAutor(autor: string): Promise<Libro[]> {
    return this.prisma.libro.findMany({
      where: { autor: { contains: autor } },
    });
  }

  async obtenerLibrosPorEditorial(editorial: string): Promise<Libro[]> {
    return this.prisma.libro.findMany({
      where: { editorial: { contains: editorial } },
    });
  }

  async obtenerLibrosPorGeneroLiterario(
    genero_literario: string,
  ): Promise<Libro[]> {
    return this.prisma.libro.findMany({
      where: {
        genero_literario: { nom_genero: { contains: genero_literario } },
      },
    });
  }

  async obtenerLibro(id: number): Promise<Libro> {
    return this.prisma.libro.findUniqueOrThrow({ where: { id } });
  }

  async crearLibro(libro: CrearLibroDto): Promise<Libro> {
    return this.prisma.libro.create({ data: libro });
  }

  async subirPortadaLibroCloudinary(imagen_portada: Express.Multer.File) {
    return this.cloudinary.subirImagen(imagen_portada);
  }

  async eliminarPortadaLibroCloudinary(public_id: string) {
    return this.cloudinary.eliminarImagen(public_id);
  }

  async actualizarLibro(id: number, libro: ActualizarLibroDto): Promise<Libro> {
    return this.prisma.libro.update({ where: { id }, data: libro });
  }

  async eliminarLibro(id: number): Promise<Libro> {
    return this.prisma.libro.delete({ where: { id } });
  }
}
