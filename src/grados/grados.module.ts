import { Module } from '@nestjs/common';
import { GradosController } from './grados.controller';
import { GradosService } from './grados.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [GradosController],
  providers: [GradosService],
  imports: [PrismaModule],
})
export class GradosModule {}
