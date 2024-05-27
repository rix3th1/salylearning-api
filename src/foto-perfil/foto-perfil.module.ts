import { Module } from '@nestjs/common';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { PrismaModule } from '../prisma/prisma.module';
import { UsuariosModule } from '../usuarios/usuarios.module';
import { FotoPerfilController } from './foto-perfil.controller';
import { FotoPerfilService } from './foto-perfil.service';

@Module({
  controllers: [FotoPerfilController],
  providers: [FotoPerfilService],
  imports: [PrismaModule, CloudinaryModule, UsuariosModule],
})
export class FotoPerfilModule {}
