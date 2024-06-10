import { Controller } from '@nestjs/common';
import { RespuestasService } from './respuestas.service';

@Controller('respuestas')
export class RespuestasController {
  constructor(private readonly respuestasService: RespuestasService) {}
}
