import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { ContactosController } from './contactos.controller';
import { ContactosService } from './contactos.service';

@Module({
  controllers: [ContactosController],
  providers: [ContactosService],
  imports: [PrismaModule],
})
export class ContactosModule {}
