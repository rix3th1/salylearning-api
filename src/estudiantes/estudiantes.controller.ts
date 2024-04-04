import { Controller } from '@nestjs/common';
import { EstudiantesService } from './estudiantes.service';

@Controller('estudiantes')
export class EstudiantesController {
  constructor(private estudiantesService: EstudiantesService) {}
}
