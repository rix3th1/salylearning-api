import { Module } from '@nestjs/common';
import { ComentariosController } from './comentarios.controller';
import { ComentariosService } from './comentarios.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [ComentariosController],
  providers: [ComentariosService],
  imports: [PrismaModule],
})
export class ComentariosModule {}
