import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { RegistrarseController } from './registrarse.controller';
import { RegistrarseService } from './registrarse.service';

@Module({
  controllers: [RegistrarseController],
  providers: [RegistrarseService],
  imports: [PrismaModule],
})
export class RegistrarseModule {}
