import { Injectable } from '@nestjs/common';
import * as JWT from 'jsonwebtoken';

@Injectable()
export class VerificarCuentaService {
  constructor() {}

  validarToken(token: string) {
    return JWT.verify(token, process.env.JWT_SECRET) as JWT.JwtPayload & {
      email: string;
    };
  }
}
