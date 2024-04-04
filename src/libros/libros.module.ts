import { Module } from '@nestjs/common';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { PrismaModule } from '../prisma/prisma.module';
import { LibrosController } from './libros.controller';
import { LibrosService } from './libros.service';

@Module({
  controllers: [LibrosController],
  providers: [LibrosService],
  imports: [PrismaModule, CloudinaryModule],
})
export class LibrosModule {}
