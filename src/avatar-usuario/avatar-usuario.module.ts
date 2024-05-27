import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { UsuariosModule } from '../usuarios/usuarios.module';
import { AvatarUsuarioController } from './avatar-usuario.controller';
import { AvatarUsuarioService } from './avatar-usuario.service';

@Module({
  controllers: [AvatarUsuarioController],
  providers: [AvatarUsuarioService],
  imports: [PrismaModule, UsuariosModule],
})
export class AvatarUsuarioModule {}
