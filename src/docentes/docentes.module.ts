import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { DocentesController } from './docentes.controller';
import { DocentesService } from './docentes.service';

@Module({
  controllers: [DocentesController],
  providers: [DocentesService],
  imports: [PrismaModule],
})
export class DocentesModule {}
