import { Injectable } from '@nestjs/common';
import * as JWT from 'jsonwebtoken';

@Injectable()
export class RecuperarClaveService {
  constructor() {}

  async enviarEmailDeRecuperacion(token: string, email: string) {
    console.info({ token, email });
  }

  async guardarTokenDeRecuperacion(token: string, email: string) {}

  async cambiarClave(clave: string) {}

  generarToken(email: string) {
    return JWT.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN_RP,
    });
  }

  async validarToken(token: string) {}
}
