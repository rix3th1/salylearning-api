import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ActualizarUsuarioDto, CrearUsuarioDto } from './dto/usuarios.dto';
import { Usuario } from './entities/usuario.entity';

@Injectable()
export class UsuariosService {
  constructor(private prisma: PrismaService) {}

  async obtenerUsuarios(): Promise<Usuario[]> {
    return this.prisma.usuario.findMany();
  }

  async obtenerUsuario(id: number): Promise<Usuario> {
    return this.prisma.usuario.findUniqueOrThrow({ where: { id } });
  }

  async obtenerUsuarioForProfile(id: number): Promise<Usuario> {
    return this.prisma.usuario.findUniqueOrThrow({
      where: { id },
      include: {
        avatar_usuario: true,
        foto_perfil: true,
        grado_usuario: { select: { grados: { select: { id: true } } } },
      },
    });
  }

  async obtenerUsuarioPorUsername(username: string): Promise<Usuario> {
    return this.prisma.usuario.findUniqueOrThrow({ where: { username } });
  }

  async obtenerUsuarioPorEmail(email: string): Promise<Usuario> {
    return this.prisma.usuario.findUniqueOrThrow({ where: { email } });
  }

  async obtenerUsuarioExistente(email: string): Promise<Usuario> {
    return this.prisma.usuario.findFirst({ where: { email } });
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

  async verificarUsuario(email: string): Promise<Usuario> {
    return this.prisma.usuario.update({
      where: { email },
      data: {
        verificado: true,
      },
    });
  }

  async cambiarClave(email: string, password: string): Promise<Usuario> {
    return this.prisma.usuario.update({ where: { email }, data: { password } });
  }

  async eliminarUsuario(id: number): Promise<Usuario> {
    return this.prisma.usuario.delete({ where: { id } });
  }
}
