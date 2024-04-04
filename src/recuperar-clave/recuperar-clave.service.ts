import { Injectable } from '@nestjs/common';
import { UsuariosService } from '../usuarios/usuarios.service';

@Injectable()
export class RecuperarClaveService {
  //@ts-ignore
  constructor(private readonly usuariosService: UsuariosService) {}
}
