import { Injectable } from '@nestjs/common';
import { Usuario } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { ActualizarUsuarioDto, CrearUsuarioDto } from './dto/usuarios.dto';

@Injectable()
export class UsuariosService {
  constructor(private prisma: PrismaService) {}

  async obtenerUsuarios(): Promise<Usuario[]> {
    return this.prisma.usuario.findMany();
  }

  async obtenerUsuarioPorId(id: number): Promise<Usuario> {
    return this.prisma.usuario.findUniqueOrThrow({ where: { id } });
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
