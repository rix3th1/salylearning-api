import { Injectable } from '@nestjs/common';
import * as JWT from 'jsonwebtoken';
import { CambiarClaveService } from '../cambiar-clave/cambiar-clave.service';
import { sendEmail } from '../nodemailer';

@Injectable()
export class RecuperarClaveService extends CambiarClaveService {
  async enviarEmailDeRecuperacion(origin: string, token: string, to: string) {
    const url = `${origin}/change-password?token=${token}`;
    const html = `
      <h1>Recuperación de contraseña Salylearning</h1>
      <p>Para restablecer tu contraseña, haz clic en el siguiente enlace:</p>
      <a href="${url}">Restablecer contraseña</a>
    `;

    return sendEmail(to, 'Restablecer contraseña', html);
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
}
