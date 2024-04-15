import { Injectable } from '@nestjs/common';
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

    if (user && isMatch && isVerified) {
      delete user.password;
      return user;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
