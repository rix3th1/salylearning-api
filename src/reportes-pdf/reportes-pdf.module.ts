import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { ReportesPdfController } from './reportes-pdf.controller';
import { ReportesPdfService } from './reportes-pdf.service';

@Module({
  controllers: [ReportesPdfController],
  providers: [ReportesPdfService],
  imports: [PrismaModule],
})
export class ReportesPdfModule {}
