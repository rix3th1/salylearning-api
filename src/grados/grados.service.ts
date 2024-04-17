import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ActualizarGradoDto, CrearGradoDto } from './dto/grados.dto';
import { Grado } from './entities/grado.entity';

@Injectable()
export class GradosService {
  constructor(private prisma: PrismaService) {}

  async contarGrados(): Promise<number> {
    return this.prisma.grado.count();
  }

  async obtenerGrados(): Promise<Grado[]> {
    return this.prisma.grado.findMany();
  }

  async obtenerGrado(id: number): Promise<Grado> {
    return this.prisma.grado.findUniqueOrThrow({ where: { id } });
  }

  async crearGrado(grado: CrearGradoDto): Promise<Grado> {
    return this.prisma.grado.create({ data: grado });
  }

  async actualizarGrado(id: number, grado: ActualizarGradoDto): Promise<Grado> {
    return this.prisma.grado.update({ where: { id }, data: grado });
  }

  async eliminarGrado(id: number): Promise<Grado> {
    return this.prisma.grado.delete({ where: { id } });
  }
}
