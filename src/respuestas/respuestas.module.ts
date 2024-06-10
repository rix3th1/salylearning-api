import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { RespuestasController } from './respuestas.controller';
import { RespuestasService } from './respuestas.service';

@Module({
  controllers: [RespuestasController],
  providers: [RespuestasService],
  imports: [PrismaModule],
})
export class RespuestasModule {}
