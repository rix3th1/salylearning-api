import { PickType } from '@nestjs/swagger';
import { CrearUsuarioDto } from '../../usuarios/dto/usuarios.dto';

export class UserLoginDto extends PickType(CrearUsuarioDto, [
  'username',
  'password',
] as const) {}
