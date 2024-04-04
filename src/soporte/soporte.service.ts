import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ActualizarSoporteDto, CrearSoporteDto } from './dto/soporte.dto';
import { Soporte } from './entities/soporte.entity';

@Injectable()
export class SoporteService {
  constructor(private prismaService: PrismaService) {}

  async obtenerSoportes(): Promise<Soporte[]> {
    return this.prismaService.soporte.findMany();
  }

  async obtenerSoporte(id: number): Promise<Soporte> {
    return this.prismaService.soporte.findUniqueOrThrow({ where: { id } });
  }

  async crearSoporte(soporte: CrearSoporteDto): Promise<Soporte> {
    return this.prismaService.soporte.create({ data: soporte });
  }

  async actualizarSoporte(
    id: number,
    soporte: ActualizarSoporteDto,
  ): Promise<Soporte> {
    return this.prismaService.soporte.update({ where: { id }, data: soporte });
  }

  async eliminarSoporte(id: number): Promise<Soporte> {
    return this.prismaService.soporte.delete({ where: { id } });
  }
}
