import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ActualizarDocenteDto, CrearDocenteDto } from './dto/docentes.dto';
import { Docente } from './entities/docente.entity';

@Injectable()
export class DocentesService {
  constructor(private prisma: PrismaService) {}

  async obtenerDocentes(): Promise<Docente[]> {
    return this.prisma.docente.findMany();
  }

  async obtenerDocente(id: number): Promise<Docente> {
    return this.prisma.docente.findUniqueOrThrow({ where: { id } });
  }

  async obtenerDocentePorIdUsuario(id_usuario: number): Promise<Docente> {
    return this.prisma.docente.findUniqueOrThrow({
      where: { id_usuario },
    });
  }

  async crearDocente(docente: CrearDocenteDto): Promise<Docente> {
    return this.prisma.docente.create({ data: docente });
  }

  async actualizarDocente(
    id: number,
    docente: ActualizarDocenteDto,
  ): Promise<Docente> {
    return this.prisma.docente.update({ where: { id }, data: docente });
  }

  async eliminarDocente(id: number): Promise<Docente> {
    return this.prisma.docente.delete({ where: { id } });
  }
}
