import { Injectable } from '@nestjs/common';
import * as JWT from 'jsonwebtoken';
import { sendEmail } from '../nodemailer';
import { UsuariosService } from '../usuarios/usuarios.service';

@Injectable()
export class RecuperarClaveService {
  constructor(private readonly usuariosService: UsuariosService) {}

  async enviarEmailDeRecuperacion(origin: string, token: string, to: string) {
    const url = `${origin}/recuperar-clave/cambiar-clave?token=${token}`;
    const html = `
      <h1>Recuperación de contraseña Salylearning</h1>
      <p>Para restablecer tu contraseña, haz clic en el siguiente enlace:</p>
      <a href="${url}">Restablecer contraseña</a>
    `;

    return sendEmail(to, 'Restablecer contraseña', html);
  }

  async cambiarClave(email: string, clave: string) {
    return this.usuariosService.cambiarClave(email, clave);
  }

  generarToken(payload: { email: string; oldPassword: string }) {
    return JWT.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRESIN_RP,
    });
  }

  validarToken(token: string) {
    return JWT.verify(token, process.env.JWT_SECRET) as JWT.JwtPayload & {
      email: string;
      oldPassword: string;
    };
  }

  async enviarEmailDeAvisoDeCambioDeClave(to: string) {
    const html = `
      <h1>Cambio de contraseña Salylearning</h1>
      <p>Se ha cambiado la contraseña de tu cuenta de Salylearning.</p>
      <p>Si no has sido tú, por favor, ponte en contacto con nosotros.</p>
    `;

    return sendEmail(to, 'Cambio de contraseña', html);
  }
}
