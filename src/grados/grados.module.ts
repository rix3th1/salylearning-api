import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { GradosController } from './grados.controller';
import { GradosService } from './grados.service';

@Module({
  controllers: [GradosController],
  providers: [GradosService],
  imports: [PrismaModule],
})
export class GradosModule {}
