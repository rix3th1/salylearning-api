import { Injectable } from '@nestjs/common';
import * as JWT from 'jsonwebtoken';
import { sendEmail } from '../nodemailer';

@Injectable()
export class VerificarCuentaService {
  constructor() {}

  validarToken(token: string) {
    return JWT.verify(token, process.env.JWT_SECRET) as JWT.JwtPayload & {
      email: string;
    };
  }

  async enviarEmailDeVerificacionExitosa(
    to: string,
    payload: { username: string; p_nombre: string; p_apellido: string },
  ) {
    const { username, p_nombre, p_apellido } = payload;
    const html = `
      <h1>Verificación de cuenta Salylearning</h1>
      <p>Sr. usuario <strong>${username}</strong>, <strong>${p_nombre} ${p_apellido}</strong>, tu cuenta ha sido verificada.</p>
      <p>Ya puedes iniciar sesión en tu cuenta.</p>
      <p>Saludos cordiales,</p>
      <p>El equipo de Salylearning</p>
    `;

    return sendEmail(to, 'Verificación de cuenta', html);
  }
}
