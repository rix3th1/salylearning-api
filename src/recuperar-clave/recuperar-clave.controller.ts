import { Controller, Get, Post } from '@nestjs/common';
import { Public } from 'src/public.decorator';
import { RecuperarClaveService } from './recuperar-clave.service';

@Controller('recuperar-clave')
export class RecuperarClaveController {
  constructor(private readonly recuperarClaveService: RecuperarClaveService) {}

  @Public()
  @Get('email')
  async enviarEmailDeRecuperacion() {
    return {
      message: 'Email enviado',
    };
  }

  @Post()
  async cambiarClave() {
    return {
      message: 'Clave cambiada',
    };
  }
}
