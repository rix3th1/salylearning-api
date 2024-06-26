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
        grado_usuario: id_grado ? { create: { id_grado } } : undefined,
        estudiante: data.rol === 'ESTUDIANTE' ? { create: {} } : undefined,
        docente: data.rol === 'DOCENTE' ? { create: {} } : undefined,
        foto_perfil: { create: {} },
        avatar_usuario: { create: {} },
      },
    });
  }

  async verificarCodigoDocente(codigo: string): Promise<boolean> {
    const codigoDocente = await this.prisma.codigoDocente.findUnique({
      where: { cod: codigo },
    });

    return !!codigoDocente;
  }

  async enviarEmailDeVerificacion(
    to: string,
    payload: {
      origin: string;
      token: string;
      username: string;
      p_nombre: string;
      p_apellido: string;
    },
  ) {
    const { origin, token, username, p_nombre, p_apellido } = payload;
    const url = `${origin}/verify-account?token=${token}`;
    const html = `
      <h1>Verificación de cuenta Salylearning</h1>
      <p>Sr. usuario <strong>${username}</strong>, <strong>${p_nombre} ${p_apellido}</strong>, para verificar tu cuenta, haz clic en el siguiente enlace:</p>
      <a href="${url}">Verificar cuenta</a>
      <p>Saludos cordiales,</p>
      <p>El equipo de Salylearning</p>
    `;

    return sendEmail(to, 'Verificar cuenta', html);
  }

  generarTokenDeActivacion(payload: { email: string }) {
    return JWT.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRESIN_AC,
    });
  }
}
