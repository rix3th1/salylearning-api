import { Injectable } from '@nestjs/common';
import * as JWT from 'jsonwebtoken';
import { sendEmail } from '../nodemailer';
import { PrismaService } from '../prisma/prisma.service';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { RegistrarseDto } from './dto/registrarse.dto';

@Injectable()
export class RegistrarseService {
  constructor(private prisma: PrismaService) {}

  async registrarUsuario(usuario: RegistrarseDto): Promise<Usuario> {
    const { id_grado, ...data } = usuario;
    delete data.confirmar_password;

    return this.prisma.usuario.create({
      data: {
        ...data,
        grado_usuario: { create: { id_grado } },
        estudiante: data.rol === 'ESTUDIANTE' ? { create: {} } : undefined,
        docente: data.rol === 'DOCENTE' ? { create: {} } : undefined,
        foto_perfil: { create: {} },
        avatar_usuario: { create: {} },
      },
    });
  }

  async enviarEmailDeVerificacion(origin: string, token: string, to: string) {
    const url = `${origin}/verify-account?token=${token}`;
    const html = `
      <h1>Verificación de cuenta Salylearning</h1>
      <p>Para verificar tu cuenta, haz clic en el siguiente enlace:</p>
      <a href="${url}">Verificar cuenta</a>
    `;

    return sendEmail(to, 'Verificar cuenta', html);
  }

  async reenviarEmailDeVerificacionPorqueElUsuarioEsDespistado(
    origin: string,
    token: string,
    to: string,
  ) {
    const url = `${origin}/verify-account?token=${token}`;
    const html = `
      <h1>Verificación de cuenta Salylearning</h1>
      <p>Ser despistado es humano. Haz clic en el siguiente enlace para verificar tu cuenta:</p>
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
