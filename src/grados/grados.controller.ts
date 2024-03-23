import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { GradosService } from './grados.service';
import { ActualizarGradoDto, CrearGradoDto } from './dto/grados.dto';
import { Prisma } from '@prisma/client';

@Controller('grados')
export class GradosController {
  constructor(private readonly gradosService: GradosService) {}

  @Get()
  async obtenerGrados() {
    return await this.gradosService.obtenerGrados();
  }

  @Get(':id')
  async obtenerGrado(@Param('id') id: string) {
    try {
      return await this.gradosService.obtenerGrado(+id);
    } catch (error) {
      console.error(error.message);
      throw new NotFoundException('No se encontró el grado solicitado');
    }
  }

  @Post()
  async crearGrado(@Body() grado: CrearGradoDto) {
    try {
      return await this.gradosService.crearGrado(grado);
    } catch (error) {
      console.error(error.message);

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new BadRequestException(
            'Ya existe un grado con el mismo nombre',
          );
        }
      }

      throw new InternalServerErrorException('Error al crear el grado');
    }
  }

  @Patch(':id')
  async actualizarGrado(
    @Param('id') id: string,
    @Body() grado: ActualizarGradoDto,
  ) {
    try {
      return await this.gradosService.actualizarGrado(+id, grado);
    } catch (error) {
      console.error(error.message);

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new BadRequestException(
            'Ya existe un grado con el mismo nombre',
          );
        }
      }

      throw new NotFoundException('No se encontró el grado solicitado');
    }
  }

  @Delete(':id')
  async eliminarGrado(@Param('id') id: string) {
    try {
      return await this.gradosService.eliminarGrado(+id);
    } catch (error) {
      console.error(error.message);
      throw new NotFoundException('No se encontró el grado solicitado');
    }
  }
}
