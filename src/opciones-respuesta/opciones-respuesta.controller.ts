import { Controller } from '@nestjs/common';
import { OpcionesRespuestaService } from './opciones-respuesta.service';

@Controller('opciones-respuesta')
export class OpcionesRespuestaController {
  constructor(
    private readonly opcionesRespuestaService: OpcionesRespuestaService,
  ) {}
}
