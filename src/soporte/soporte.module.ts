import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { SoporteController } from './soporte.controller';
import { SoporteService } from './soporte.service';

@Module({
  controllers: [SoporteController],
  providers: [SoporteService],
  imports: [PrismaModule],
})
export class SoporteModule {}
