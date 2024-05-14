import { PickType } from '@nestjs/swagger';
import { CrearUsuarioDto } from '../../usuarios/dto/usuarios.dto';
import { RegistrarseDto } from 'src/registrarse/dto/registrarse.dto';

export class RecuperarClaveDto extends PickType(RegistrarseDto, [
  'email',
] as const) {}

export class CambiarClaveDto extends PickType(RegistrarseDto, [
  'password',
  'confirmar_password',
] as const) {}
