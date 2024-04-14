import { PickType } from '@nestjs/swagger';
import { CrearUsuarioDto } from '../../usuarios/dto/usuarios.dto';

export class RecuperarClaveDto extends PickType(CrearUsuarioDto, [
  'email',
] as const) {}
