import { Injectable } from '@nestjs/common';
import { UsuariosService } from '../usuarios/usuarios.service';

@Injectable()
export class RecuperarClaveService {
  constructor(private readonly usuariosService: UsuariosService) {}
}
