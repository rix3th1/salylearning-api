import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsuariosService } from '../../usuarios/usuarios.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usuariosService: UsuariosService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    try {
      const usuario = await this.usuariosService.obtenerUsuarioForProfile(
        payload.sub,
      );
      const { id, ...result } = usuario;
      delete usuario.password;
      return { userId: id, ...result };
    } catch (error) {
      console.error(error.message);
      throw new UnauthorizedException();
    }
  }
}
