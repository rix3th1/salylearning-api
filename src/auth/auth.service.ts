import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { UsuariosService } from '../usuarios/usuarios.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuariosService: UsuariosService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usuariosService.obtenerUsuarioPorUsername(username);
    const isMatch = await argon2.verify(user.password, pass);
    const isVerified = user.verificado;

    if (!user || !isMatch) {
      return null;
    }

    if (!isVerified) {
      throw new ForbiddenException(
        `Sr. ${user.p_nombre} ${user.p_apellido}, su cuenta no ha sido verificada. Por favor revise su correo electrónico.`,
      );
    }

    // Delete the password from the user object
    delete user.password;
    return user;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
