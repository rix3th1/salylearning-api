import { Injectable } from '@nestjs/common';
import { sendEmail } from '../nodemailer';
import { UsuariosService } from '../usuarios/usuarios.service';

@Injectable()
export class CambiarClaveService {
  constructor(private readonly usuariosService: UsuariosService) {}

  async cambiarClave(email: string, clave: string) {
    return this.usuariosService.cambiarClave(email, clave);
  }

  async enviarEmailDeAvisoDeCambioDeClave(
    to: string,
    payload: { username: string; p_nombre: string; p_apellido: string },
  ) {
    const { username, p_nombre, p_apellido } = payload;
    const html = `
      <h1>Cambio de contraseña Salylearning</h1>
      <p>Sr. usuario <strong>${username}</strong>, <strong>${p_nombre} ${p_apellido}</strong> ha cambiado la contraseña de su cuenta de Salylearning.</p>
      <p>Si no has sido tú, por favor, ponte en contacto con nosotros.</p>
      <p>Saludos cordiales,</p>
      <p>El equipo de Salylearning</p>
    `;

    return sendEmail(to, 'Cambio de contraseña', html);
  }
}
