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

  async enviarEmailDeVerificacionExitosa(to: string) {
    const html = `
      <h1>Verificación de cuenta Salylearning</h1>
      <p>Se ha verificado tu cuenta de Salylearning.</p>
      <p>Ya puedes iniciar sesión en tu cuenta.</p>
    `;

    return sendEmail(to, 'Verificación de cuenta', html);
  }
}
