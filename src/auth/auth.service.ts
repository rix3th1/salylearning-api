import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';
import { UsuariosService } from '../usuarios/usuarios.service';

@Injectable()
export class AuthService {
  constructor(private readonly usuariosService: UsuariosService) {}

  async validarUsuario(username: string, pass: string): Promise<any> {
    const usuario =
      await this.usuariosService.obtenerUsuarioPorUsername(username);
    const passwordCoincide = await argon2.verify(usuario.password, pass);

    if (usuario && passwordCoincide) {
      const { password, ...result } = usuario;
      return result;
    }
    return null;
  }
}
