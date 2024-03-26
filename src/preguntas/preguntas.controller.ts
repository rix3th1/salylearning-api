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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { ActualizarPreguntaDto, CrearPreguntaDto } from './dto/preguntas.dto';
import { Pregunta } from './entities/pregunta.entity';
import { PreguntasService } from './preguntas.service';

@ApiTags('preguntas')
@Controller('preguntas')
export class PreguntasController {
  constructor(private readonly preguntasService: PreguntasService) {}

  @Get()
  @ApiOperation({
    summary: 'Obtener todas las preguntas',
    description: 'Obtiene todas las preguntas de la base de datos',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de preguntas',
    type: [Pregunta],
  })
  async obtenerPreguntas() {
    return await this.preguntasService.obtenerPreguntas();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener una pregunta por su ID',
    description: 'Obtiene una pregunta de la base de datos por su ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Pregunta encontrada',
    type: Pregunta,
  })
  async obtenerPregunta(@Param('id') id: string) {
    try {
      return await this.preguntasService.obtenerPregunta(+id);
    } catch (error) {
      console.error(error.message);
      throw new NotFoundException('Pregunta no encontrada');
    }
  }

  @Post()
  @ApiOperation({
    summary: 'Crear una pregunta',
    description: 'Crea una pregunta en la base de datos',
  })
  @ApiResponse({
    status: 201,
    description: 'Pregunta creada',
    type: Pregunta,
  })
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
  @ApiOperation({
    summary: 'Actualizar una pregunta',
    description: 'Actualiza una pregunta en la base de datos',
  })
  @ApiResponse({
    status: 200,
    description: 'Pregunta actualizada',
    type: Pregunta,
  })
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
  @ApiOperation({
    summary: 'Eliminar una pregunta',
    description: 'Elimina una pregunta de la base de datos',
  })
  @ApiResponse({
    status: 200,
    description: 'Pregunta eliminada',
    type: Pregunta,
  })
  async eliminarPregunta(@Param('id') id: string) {
    try {
      return await this.preguntasService.eliminarPregunta(+id);
    } catch (error) {
      console.error(error.message);
      throw new NotFoundException('Pregunta no encontrada');
    }
  }
}
