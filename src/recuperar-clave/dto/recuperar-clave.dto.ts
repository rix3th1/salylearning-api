import { PickType } from '@nestjs/swagger';
import { RegistrarseDto } from '../../registrarse/dto/registrarse.dto';

export class RecuperarClaveDto extends PickType(RegistrarseDto, [
  'email',
] as const) {}

export class CambiarClaveRecuperacionDto extends PickType(RegistrarseDto, [
  'password',
  'confirmar_password',
] as const) {}
