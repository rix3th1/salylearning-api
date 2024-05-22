import { PickType } from '@nestjs/swagger';
import { RegistrarseDto } from '../../registrarse/dto/registrarse.dto';

export class LoginUsuarioDto extends PickType(RegistrarseDto, [
  'username',
  'password',
] as const) {}
