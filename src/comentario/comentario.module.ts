import { Module } from '@nestjs/common';
import { ComentarioController } from './comentario.controller';
import { ComentarioService } from './comentario.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [ComentarioController],
  providers: [ComentarioService],
  imports: [PrismaModule],
})
export class ComentarioModule {}
