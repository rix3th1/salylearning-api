import { Injectable } from '@nestjs/common';
import * as JWT from 'jsonwebtoken';
import { sendEmail } from '../nodemailer';
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

  async enviarEmailDeVerificacion(origin: string, token: string, to: string) {
    const url = `${origin}/verificar-cuenta?token=${token}`;
    const html = `
      <h1>Verificación de cuenta Salylearning</h1>
      <p>Para verificar tu cuenta, haz clic en el siguiente enlace:</p>
      <a href="${url}">Verificar cuenta</a>
    `;

    return sendEmail(to, 'Verificar cuenta', html);
  }

  generarTokenDeActivacion(payload: { email: string }) {
    return JWT.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRESIN_AC,
    });
  }
}
