import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Res,
  StreamableFile,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import type { Response } from 'express';
import { ReportesPdfService } from './reportes-pdf.service';

@ApiBearerAuth('access-token')
@ApiTags('reportes-pdf')
@Controller('reportes-pdf')
export class ReportesPdfController {
  constructor(private readonly reportesPdfService: ReportesPdfService) {}

  @Get('calificaciones/grado/:id_grado')
  @ApiOperation({
    summary: 'Obtener calificaciones de estudiantes por grado en PDF',
    description: 'Obtiene calificaciones de estudiantes por grado en PDF',
  })
  @ApiOkResponse({
    description: 'Calificaciones de estudiantes por grado en PDF',
    type: Buffer,
  })
  async obtenerCalificacionesEstudiantesPorGrado(
    @Param('id_grado') id_grado: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<StreamableFile> {
    try {
      const data =
        await this.reportesPdfService.obtenerCalificacionesEstudiantesPorGrado(
          +id_grado,
        );

      const buffer = await this.reportesPdfService.generatePDF(data);

      res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename=Salylearning-Reporte-Grado-${id_grado}-Calificaciones-Estudiantes.pdf`,
        'Content-Length': buffer.length,
      });
      return new StreamableFile(buffer);
    } catch (error) {
      console.error(error.message);

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(
            'No se encontró el grado de estudiantes con el ID proporcionado',
          );
        }
      }
    }
  }
}
