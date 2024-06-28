import { BadGatewayException, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import * as JWT from 'jsonwebtoken';
import { CambiarClaveService } from '../cambiar-clave/cambiar-clave.service';
import { sendEmail } from '../nodemailer';

interface emailPayload {
  origin: string;
  token: string;
  username: string;
  p_nombre: string;
  p_apellido: string;
}

@Injectable()
export class RecuperarClaveService extends CambiarClaveService {
  @OnEvent('enviar-email-de-recuperacion', { async: true })
  async enviarEmailDeRecuperacion(
    to: string,
    { origin, token, username, p_nombre, p_apellido }: emailPayload,
  ) {
    const url = `${origin}/change-password?token=${token}`;
    const html = `
      <h1>Recuperación de contraseña Salylearning</h1> 
      <p>Sr. usuario <strong>${username}</strong>, <strong>${p_nombre} ${p_apellido}</strong>, para restablecer tu contraseña, haz clic en el siguiente enlace:</p>
      <a href="${url}">Restablecer contraseña</a>
      <p>Saludos cordiales,</p>
      <p>El equipo de Salylearning</p>
    `;

    const response = await sendEmail(to, 'Restablecer contraseña', html);

    if (response.error) {
      throw new BadGatewayException(
        `Error al enviar el email de recuperación de clave a "${to}". Por favor, intenta de nuevo más tarde.`,
      );
    }
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
