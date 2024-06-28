import { BadGatewayException, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { sendEmail } from '../nodemailer';
import { UsuariosService } from '../usuarios/usuarios.service';

interface emailPayload {
  username: string;
  p_nombre: string;
  p_apellido: string;
}

@Injectable()
export class CambiarClaveService {
  constructor(private readonly usuariosService: UsuariosService) {}

  async cambiarClave(email: string, clave: string) {
    return this.usuariosService.cambiarClave(email, clave);
  }

  @OnEvent('enviar-email-de-aviso-de-cambio-de-clave', { async: true })
  async enviarEmailDeAvisoDeCambioDeClave(
    to: string,
    { username, p_nombre, p_apellido }: emailPayload,
  ) {
    const html = `
      <h1>Cambio de contraseña Salylearning</h1>
      <p>Sr. usuario <strong>${username}</strong>, <strong>${p_nombre} ${p_apellido}</strong> ha cambiado la contraseña de su cuenta de Salylearning.</p>
      <p>Si no has sido tú, por favor, ponte en contacto con nosotros.</p>
      <p>Saludos cordiales,</p>
      <p>El equipo de Salylearning</p>
    `;

    const response = await sendEmail(to, 'Cambio de contraseña', html);

    if (response.error) {
      throw new BadGatewayException(
        'Error al enviar el email de aviso de cambio de clave. Por favor, intenta de nuevo más tarde.',
      );
    }
  }
}
