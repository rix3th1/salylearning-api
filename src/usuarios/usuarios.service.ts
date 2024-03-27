import { Injectable } from '@nestjs/common';
import { Usuario } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { ActualizarUsuarioDto, CrearUsuarioDto } from './dto/usuarios.dto';

@Injectable()
export class UsuariosService {
  constructor(private prisma: PrismaService) {}

  async obtenerUsuarios(): Promise<Omit<Usuario, 'password'>[]> {
    return this.prisma.usuario.findMany({
      select: {
        id: true,
        username: true,
        p_nombre: true,
        s_nombre: true,
        p_apellido: true,
        s_apellido: true,
        edad: true,
        email: true,
      },
    });
  }

  async obtenerUsuarioPorId(id: number): Promise<Usuario> {
    return this.prisma.usuario.findUniqueOrThrow({ where: { id } });
  }

  async obtenerUsuarioPorUsername(username: string): Promise<Usuario> {
    return this.prisma.usuario.findUniqueOrThrow({ where: { username } });
  }

  async obtenerUsuarioPorEmail(email: string): Promise<Usuario> {
    return this.prisma.usuario.findUniqueOrThrow({ where: { email } });
  }

  async crearUsuario(usuario: CrearUsuarioDto): Promise<Usuario> {
    return this.prisma.usuario.create({ data: usuario });
  }

  async actualizarUsuario(
    id: number,
    usuario: ActualizarUsuarioDto,
  ): Promise<Usuario> {
    return this.prisma.usuario.update({ where: { id }, data: usuario });
  }

  async eliminarUsuario(id: number): Promise<Usuario> {
    return this.prisma.usuario.delete({ where: { id } });
  }
}
