import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { UsuariosController } from './usuarios.controller';
import { UsuariosService } from './usuarios.service';

@Module({
  controllers: [UsuariosController],
  providers: [UsuariosService],
  imports: [PrismaModule],
  exports: [UsuariosService],
})
export class UsuariosModule {}
