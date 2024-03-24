import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { GradoUsuarioController } from './grado-usuario.controller';
import { GradoUsuarioService } from './grado-usuario.service';

@Module({
  controllers: [GradoUsuarioController],
  providers: [GradoUsuarioService],
  imports: [PrismaModule],
})
export class GradoUsuarioModule {}
