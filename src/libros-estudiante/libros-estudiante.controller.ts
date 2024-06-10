import { Controller } from '@nestjs/common';
import { LibrosEstudianteService } from './libros-estudiante.service';

@Controller('libros-estudiante')
export class LibrosEstudianteController {
  constructor(
    private readonly librosEstudianteService: LibrosEstudianteService,
  ) {}
}
