import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { RegistrarUsuarioDto } from './dto/registrarse.dto';

@Injectable()
export class RegistrarseService {
  constructor(private prisma: PrismaService) {}

  async registrarUsuario(usuario: RegistrarUsuarioDto): Promise<Usuario> {
    const { id_grado, ...data } = usuario;

    return this.prisma.usuario.create({
      data: {
        ...data,
        grado_usuario: {
          create: {
            id_grado,
          },
        },
      },
    });
  }
}
