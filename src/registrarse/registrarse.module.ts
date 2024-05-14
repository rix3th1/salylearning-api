import { Module } from '@nestjs/common';
import { UsuariosModule } from 'src/usuarios/usuarios.module';
import { PrismaModule } from '../prisma/prisma.module';
import { RegistrarseController } from './registrarse.controller';
import { RegistrarseService } from './registrarse.service';

@Module({
  controllers: [RegistrarseController],
  providers: [RegistrarseService],
  imports: [PrismaModule, UsuariosModule],
})
export class RegistrarseModule {}
