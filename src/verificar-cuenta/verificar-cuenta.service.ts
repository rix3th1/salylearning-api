import { BadGatewayException, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import * as JWT from 'jsonwebtoken';
import { sendEmail } from '../nodemailer';

interface emailPayload {
  username: string;
  p_nombre: string;
  p_apellido: string;
}

@Injectable()
export class VerificarCuentaService {
  constructor() {}

  validarToken(token: string) {
    return JWT.verify(token, process.env.JWT_SECRET) as JWT.JwtPayload & {
      email: string;
    };
  }

  @OnEvent('verificacion-exitosa', { async: true })
  async enviarEmailDeVerificacionExitosa(
    to: string,
    { username, p_nombre, p_apellido }: emailPayload,
  ) {
    const html = `
      <h1>Verificación de cuenta Salylearning</h1>
      <p>Sr. usuario <strong>${username}</strong>, <strong>${p_nombre} ${p_apellido}</strong>, tu cuenta ha sido verificada.</p>
      <p>Ya puedes iniciar sesión en tu cuenta.</p>
      <p>Saludos cordiales,</p>
      <p>El equipo de Salylearning</p>
    `;

    const response = await sendEmail(to, 'Verificación de cuenta', html);

    if (response.error) {
      throw new BadGatewayException(
        'Hubo un error al enviar el email de verificación de cuenta. Por favor, intenta de nuevo.',
      );
    }
  }
}
