import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { OpcionesRespuestaController } from './opciones-respuesta.controller';
import { OpcionesRespuestaService } from './opciones-respuesta.service';

@Module({
  controllers: [OpcionesRespuestaController],
  providers: [OpcionesRespuestaService],
  imports: [PrismaModule],
})
export class OpcionesRespuestaModule {}
