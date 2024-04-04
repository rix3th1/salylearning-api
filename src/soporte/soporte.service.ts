import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ActualizarSoporteDto, CrearSoporteDto } from './dto/soporte.dto';
import { Soporte } from './entities/soporte.entity';

@Injectable()
export class SoporteService {
  constructor(private prisma: PrismaService) {}

  async obtenerSoportes(): Promise<Soporte[]> {
    return this.prisma.soporte.findMany();
  }

  async obtenerSoporte(id: number): Promise<Soporte> {
    return this.prisma.soporte.findUniqueOrThrow({ where: { id } });
  }

  async crearSoporte(soporte: CrearSoporteDto): Promise<Soporte> {
    return this.prisma.soporte.create({ data: soporte });
  }

  async actualizarSoporte(
    id: number,
    soporte: ActualizarSoporteDto,
  ): Promise<Soporte> {
    return this.prisma.soporte.update({ where: { id }, data: soporte });
  }

  async eliminarSoporte(id: number): Promise<Soporte> {
    return this.prisma.soporte.delete({ where: { id } });
  }
}
