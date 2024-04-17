import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { GenerosLiterariosController } from './generos-literarios.controller';
import { GenerosLiterariosService } from './generos-literarios.service';

@Module({
  controllers: [GenerosLiterariosController],
  providers: [GenerosLiterariosService],
  imports: [PrismaModule],
})
export class GenerosLiterariosModule {}
