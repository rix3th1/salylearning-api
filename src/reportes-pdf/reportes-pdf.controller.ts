import {
  Controller,
  Get,
  Header,
  NotFoundException,
  Param,
  StreamableFile,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { createReadStream } from 'fs';
import { join } from 'path';
import { Public } from 'src/public.decorator';
import { ReportesPdfService } from './reportes-pdf.service';

@ApiBearerAuth('access-token')
@ApiTags('reportes-pdf')
@Controller('reportes-pdf')
export class ReportesPdfController {
  constructor(private readonly reportesPdfService: ReportesPdfService) {}

  @Public()
  @Get()
  @Header('Content-Type', 'application/json')
  @Header('Content-Disposition', 'attachment; filename=package.json')
  getFile(): StreamableFile {
    const file = createReadStream(join(process.cwd(), 'package.json'));
    return new StreamableFile(file);
  }

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
  ) {
    try {
      return await this.reportesPdfService.obtenerCalificacionesEstudiantesPorGrado(
        +id_grado,
      );
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
