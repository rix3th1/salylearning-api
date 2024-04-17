import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  ActualizarGeneroLiterarioDto,
  CrearGeneroLiterarioDto,
} from './dto/genero-literario.dto';
import { GeneroLiterario } from './entities/genero-literario.entity';

@Injectable()
export class GenerosLiterariosService {
  constructor(private prisma: PrismaService) {}

  async contarGenerosLiterarios(): Promise<number> {
    return this.prisma.generoLiterario.count();
  }

  async obtenerGenerosLiterarios(): Promise<GeneroLiterario[]> {
    return this.prisma.generoLiterario.findMany();
  }

  async obtenerGeneroLiterario(id: number): Promise<GeneroLiterario> {
    return this.prisma.generoLiterario.findUniqueOrThrow({ where: { id } });
  }

  async crearGeneroLiterario(
    generoLiterario: CrearGeneroLiterarioDto,
  ): Promise<GeneroLiterario> {
    return this.prisma.generoLiterario.create({ data: generoLiterario });
  }

  async actualizarGeneroLiterario(
    id: number,
    generoLiterario: ActualizarGeneroLiterarioDto,
  ): Promise<GeneroLiterario> {
    return this.prisma.generoLiterario.update({
      where: { id },
      data: generoLiterario,
    });
  }

  async eliminarGeneroLiterario(id: number): Promise<GeneroLiterario> {
    return this.prisma.generoLiterario.delete({ where: { id } });
  }
}
