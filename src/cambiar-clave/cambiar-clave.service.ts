import { Injectable } from '@nestjs/common';
import { sendEmail } from '../nodemailer';
import { UsuariosService } from '../usuarios/usuarios.service';

@Injectable()
export class CambiarClaveService {
  constructor(private readonly usuariosService: UsuariosService) {}

  async cambiarClave(email: string, clave: string) {
    return this.usuariosService.cambiarClave(email, clave);
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
