import { Injectable } from '@nestjs/common';
import { MisLibros } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { ActualizarMiLibroDto, CrearMiLibroDto } from './dto/mis-libros.dto';

@Injectable()
export class MisLibrosService {
  constructor(private prisma: PrismaService) {}

  async obtenerMisLibros(): Promise<MisLibros[]> {
    return this.prisma.misLibros.findMany();
  }

  async obtenerMiLibro(id: number): Promise<MisLibros> {
    return this.prisma.misLibros.findUniqueOrThrow({ where: { id } });
  }

  async crearMiLibro(miLibro: CrearMiLibroDto): Promise<MisLibros> {
    return this.prisma.misLibros.create({ data: miLibro });
  }

  async actualizarMiLibro(
    id: number,
    miLibro: ActualizarMiLibroDto,
  ): Promise<MisLibros> {
    return this.prisma.misLibros.update({ where: { id }, data: miLibro });
  }

  async eliminarMiLibro(id: number): Promise<MisLibros> {
    return this.prisma.misLibros.delete({ where: { id } });
  }
}
