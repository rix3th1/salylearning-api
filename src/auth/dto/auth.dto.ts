import { PickType } from '@nestjs/swagger';
import { CrearUsuarioDto } from '../../usuarios/dto/usuarios.dto';

export class LoginUsuarioDto extends PickType(CrearUsuarioDto, [
  'username',
  'password',
] as const) {}
