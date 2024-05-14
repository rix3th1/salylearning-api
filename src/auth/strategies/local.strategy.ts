import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    try {
      const user = await this.authService.validateUser(username, password);
      if (!user) {
        throw new UnauthorizedException('Credenciales incorrectas.');
      }
      return user;
    } catch (error) {
      console.error(error.message);

      if (error instanceof UnauthorizedException) {
        throw error;
      } else if (error instanceof ForbiddenException) {
        throw error;
      }
    }
  }
}
