import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsuariosService } from 'src/usuarios/usuarios.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usuariosService: UsuariosService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWTSECRET,
    });
  }

  async validate(payload: any) {
    try {
      const { password, id, ...result } =
        await this.usuariosService.obtenerUsuarioPorId(payload.sub);
      return { userId: payload.sub, username: payload.username, ...result };
    } catch (error) {
      console.error(error.message);
      throw new UnauthorizedException();
    }
  }
}
