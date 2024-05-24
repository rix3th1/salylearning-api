import { Controller, Get, Request } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { UsuarioRespuesta } from '../usuarios/entities/usuario.entity';

@ApiBearerAuth('access-token')
@ApiTags('perfil')
@Controller('perfil')
export class PerfilController {
  constructor() {}

  @Get()
  @ApiOperation({
    summary: 'Perfil de usuario',
    description: 'Obtiene el perfil de usuario',
  })
  @ApiOkResponse({
    description: 'Perfil de usuario',
    type: UsuarioRespuesta,
  })
  getProfile(@Request() req: Express.Request) {
    return req.user;
  }
}
