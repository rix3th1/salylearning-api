import { Module } from '@nestjs/common';
import { EstudiantesModule } from '../estudiantes/estudiantes.module';
import { PrismaModule } from '../prisma/prisma.module';
import { CuestionarioEstudianteController } from './cuestionario-estudiante.controller';
import { CuestionarioEstudianteService } from './cuestionario-estudiante.service';

@Module({
  controllers: [CuestionarioEstudianteController],
  providers: [CuestionarioEstudianteService],
  imports: [PrismaModule, EstudiantesModule],
})
export class CuestionarioEstudianteModule {}
