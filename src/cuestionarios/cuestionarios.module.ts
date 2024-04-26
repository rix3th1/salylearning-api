import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { CuestionariosController } from './cuestionarios.controller';
import { CuestionariosService } from './cuestionarios.service';

@Module({
  controllers: [CuestionariosController],
  providers: [CuestionariosService],
  imports: [PrismaModule],
})
export class CuestionariosModule {}
