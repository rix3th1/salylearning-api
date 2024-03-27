import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validar(username: string, password: string): Promise<any> {
    try {
      const usuario = await this.authService.validarUsuario(username, password);
      if (!usuario) {
        throw new UnauthorizedException();
      }
      return usuario;
    } catch (error) {
      console.error(error.message);
      throw new UnauthorizedException();
    }
  }
}
