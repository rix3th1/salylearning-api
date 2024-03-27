import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { LibrosController } from './libros.controller';
import { LibrosService } from './libros.service';

@Module({
  controllers: [LibrosController],
  providers: [LibrosService],
  imports: [PrismaModule],
})
export class LibrosModule {}
