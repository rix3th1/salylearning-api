import { Module } from '@nestjs/common';
import { EstudiantesModule } from '../estudiantes/estudiantes.module';
import { PrismaModule } from '../prisma/prisma.module';
import { LibrosEstudianteController } from './libros-estudiante.controller';
import { LibrosEstudianteService } from './libros-estudiante.service';

@Module({
  controllers: [LibrosEstudianteController],
  providers: [LibrosEstudianteService],
  imports: [PrismaModule, EstudiantesModule],
})
export class LibrosEstudianteModule {}
