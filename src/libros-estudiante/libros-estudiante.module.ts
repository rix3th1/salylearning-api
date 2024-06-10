import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { LibrosEstudianteController } from './libros-estudiante.controller';
import { LibrosEstudianteService } from './libros-estudiante.service';

@Module({
  controllers: [LibrosEstudianteController],
  providers: [LibrosEstudianteService],
  imports: [PrismaModule],
})
export class LibrosEstudianteModule {}
