import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { EstudiantesController } from './estudiantes.controller';
import { EstudiantesService } from './estudiantes.service';

@Module({
  controllers: [EstudiantesController],
  providers: [EstudiantesService],
  imports: [PrismaModule],
})
export class EstudiantesModule {}
