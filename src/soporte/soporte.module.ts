import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { UsuariosModule } from '../usuarios/usuarios.module';
import { SoporteController } from './soporte.controller';
import { SoporteService } from './soporte.service';

@Module({
  controllers: [SoporteController],
  providers: [SoporteService],
  imports: [PrismaModule, UsuariosModule],
})
export class SoporteModule {}
