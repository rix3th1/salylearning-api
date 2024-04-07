import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  ActualizarAvatarUsuarioDto,
  CrearAvatarUsuarioDto,
} from './dto/avatar-usuario.dto';
import { AvatarUsuario } from './entities/avatar-usuario.entity';

@Injectable()
export class AvatarUsuarioService {
  constructor(private prisma: PrismaService) {}

  async obtenerAvataresUsuario(): Promise<AvatarUsuario[]> {
    return this.prisma.avatarUsuario.findMany();
  }

  async obtenerAvatarUsuario(id: number): Promise<AvatarUsuario> {
    return this.prisma.avatarUsuario.findUniqueOrThrow({ where: { id } });
  }

  async crearAvatarUsuario(
    avatarUsuario: CrearAvatarUsuarioDto,
  ): Promise<AvatarUsuario> {
    return this.prisma.avatarUsuario.create({ data: avatarUsuario });
  }

  async actualizarAvatarUsuario(
    id: number,
    avatarUsuario: ActualizarAvatarUsuarioDto,
  ): Promise<AvatarUsuario> {
    return this.prisma.avatarUsuario.update({
      where: { id },
      data: avatarUsuario,
    });
  }

  async eliminarAvatarUsuario(id: number): Promise<AvatarUsuario> {
    return this.prisma.avatarUsuario.delete({ where: { id } });
  }
}
