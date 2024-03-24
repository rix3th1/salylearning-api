import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AvatarUsuarioController } from './avatar-usuario.controller';
import { AvatarUsuarioService } from './avatar-usuario.service';

@Module({
  controllers: [AvatarUsuarioController],
  providers: [AvatarUsuarioService],
  imports: [PrismaModule],
})
export class AvatarUsuarioModule {}
