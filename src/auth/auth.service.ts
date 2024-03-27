import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';
import { UsuariosService } from 'src/usuarios/usuarios.service';

@Injectable()
export class AuthService {
  constructor(private readonly usuariosService: UsuariosService) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usuariosService.obtenerUsuarioPorUsername(username);
    const isMatch = await argon2.verify(user.password, password);

    if (user && isMatch) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
