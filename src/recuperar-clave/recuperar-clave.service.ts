import { Injectable } from '@nestjs/common';
import { UsuariosService } from 'src/usuarios/usuarios.service';

@Injectable()
export class RecuperarClaveService {
  constructor(private readonly usuariosService: UsuariosService) {}
}
