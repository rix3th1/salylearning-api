import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { UsuariosModule } from '../usuarios/usuarios.module';
import { RegistrarseController } from './registrarse.controller';
import { RegistrarseService } from './registrarse.service';

@Module({
  controllers: [RegistrarseController],
  providers: [RegistrarseService],
  imports: [PrismaModule, UsuariosModule],
})
export class RegistrarseModule {}
