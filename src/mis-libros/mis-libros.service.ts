import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ActualizarMiLibroDto, CrearMiLibroDto } from './dto/mis-libros.dto';
import { MiLibro } from './entities/mi-libro.entity';

@Injectable()
export class MisLibrosService {
  constructor(private prisma: PrismaService) {}

  async contarMisLibros(): Promise<number> {
    return this.prisma.miLibro.count();
  }

  async obtenerMisLibros(): Promise<MiLibro[]> {
    return this.prisma.miLibro.findMany();
  }

  async obtenerMiLibro(id: number): Promise<MiLibro> {
    return this.prisma.miLibro.findUniqueOrThrow({ where: { id } });
  }

  async crearMiLibro(miLibro: CrearMiLibroDto): Promise<MiLibro> {
    return this.prisma.miLibro.create({ data: miLibro });
  }

  async actualizarMiLibro(
    id: number,
    miLibro: ActualizarMiLibroDto,
  ): Promise<MiLibro> {
    return this.prisma.miLibro.update({ where: { id }, data: miLibro });
  }

  async eliminarMiLibro(id: number): Promise<MiLibro> {
    return this.prisma.miLibro.delete({ where: { id } });
  }
}
