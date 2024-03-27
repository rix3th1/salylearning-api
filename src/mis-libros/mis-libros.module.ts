import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { MisLibrosController } from './mis-libros.controller';
import { MisLibrosService } from './mis-libros.service';

@Module({
  controllers: [MisLibrosController],
  providers: [MisLibrosService],
  imports: [PrismaModule],
})
export class MisLibrosModule {}
