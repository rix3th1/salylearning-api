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
import { PreguntasService } from './preguntas.service';
import { ActualizarPreguntaDto, CrearPreguntaDto } from './dto/preguntas.dto';
import { Prisma } from '@prisma/client';

@Controller('preguntas')
export class PreguntasController {
  constructor(private readonly preguntasService: PreguntasService) {}

  @Get()
  async obtenerPreguntas() {
    return await this.preguntasService.obtenerPreguntas();
  }

  @Get(':id')
  async obtenerPregunta(@Param('id') id: string) {
    try {
      return await this.preguntasService.obtenerPregunta(+id);
    } catch (error) {
      console.error(error.message);
      throw new NotFoundException('Pregunta no encontrada');
    }
  }

  @Post()
  async crearPregunta(@Body() pregunta: CrearPreguntaDto) {
    try {
      return await this.preguntasService.crearPregunta(pregunta);
    } catch (error) {
      console.error(error.message);

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new BadRequestException('La pregunta ya existe');
        } else if (error.code === 'P2003') {
          throw new BadRequestException('El id de libro no existe');
        }
      }

      throw new InternalServerErrorException('Error al crear la pregunta');
    }
  }

  @Patch(':id')
  async actualizarPregunta(
    @Param('id') id: string,
    @Body() pregunta: ActualizarPreguntaDto,
  ) {
    try {
      return await this.preguntasService.actualizarPregunta(+id, pregunta);
    } catch (error) {
      console.error(error.message);

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new BadRequestException('La pregunta ya existe');
        } else if (error.code === 'P2003') {
          throw new BadRequestException('El id de libro no existe');
        }
      }

      throw new NotFoundException('Pregunta no encontrada');
    }
  }

  @Delete(':id')
  async eliminarPregunta(@Param('id') id: string) {
    try {
      return await this.preguntasService.eliminarPregunta(+id);
    } catch (error) {
      console.error(error.message);
      throw new NotFoundException('Pregunta no encontrada');
    }
  }
}
