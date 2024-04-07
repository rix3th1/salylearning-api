import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  ActualizarGradoUsuarioDto,
  CrearGradoUsuarioDto,
} from './dto/grado-usuario.dto';
import { GradoUsuario } from './entities/grado-usuario.entity';

@Injectable()
export class GradoUsuarioService {
  constructor(private prisma: PrismaService) {}

  async obtenerGradosUsuario(): Promise<GradoUsuario[]> {
    return this.prisma.gradoUsuario.findMany();
  }

  async obtenerGradoUsuario(id: number): Promise<GradoUsuario> {
    return this.prisma.gradoUsuario.findUniqueOrThrow({ where: { id } });
  }

  async crearGradoUsuario(
    gradoUsuario: CrearGradoUsuarioDto,
  ): Promise<GradoUsuario> {
    return this.prisma.gradoUsuario.create({ data: gradoUsuario });
  }

  async actualizarGradoUsuario(
    id: number,
    gradoUsuario: ActualizarGradoUsuarioDto,
  ): Promise<GradoUsuario> {
    return this.prisma.gradoUsuario.update({
      where: { id },
      data: gradoUsuario,
    });
  }

  async eliminarGradoUsuario(id: number): Promise<GradoUsuario> {
    return this.prisma.gradoUsuario.delete({ where: { id } });
  }
}
