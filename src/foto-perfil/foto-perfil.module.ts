import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { FotoPerfilController } from './foto-perfil.controller';
import { FotoPerfilService } from './foto-perfil.service';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  controllers: [FotoPerfilController],
  providers: [FotoPerfilService],
  imports: [PrismaModule, CloudinaryModule],
})
export class FotoPerfilModule {}
