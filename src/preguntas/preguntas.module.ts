import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PreguntasController } from './preguntas.controller';
import { PreguntasService } from './preguntas.service';

@Module({
  controllers: [PreguntasController],
  providers: [PreguntasService],
  imports: [PrismaModule],
})
export class PreguntasModule {}
