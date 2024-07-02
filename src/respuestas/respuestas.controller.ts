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
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { ActualizarRespuestaDto, CrearRespuestaDto } from './dto/respuesta.dto';
import { Respuesta } from './entities/respuesta.entity';
import { RespuestasService } from './respuestas.service';

@ApiBearerAuth('access-token')
@ApiTags('respuestas')
@Controller('respuestas')
export class RespuestasController {
  constructor(private readonly respuestasService: RespuestasService) {}

  @Get()
  @ApiOperation({
    summary: 'Obtener todas las respuestas de las preguntas',
    description: 'Obtiene todas las respuestas de las preguntas existentes.',
  })
  @ApiOkResponse({
    description: 'Respuestas de las preguntas encontradas',
    type: [Respuesta],
  })
  async obtenerRespuestas() {
    return await this.respuestasService.obtenerRespuestas();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener una respuesta de las preguntas',
    description: 'Obtiene una respuesta de las preguntas existentes.',
  })
  @ApiOkResponse({
    description: 'Respuesta de las preguntas encontrada',
    type: Respuesta,
  })
  async obtenerRespuesta(@Param('id') id: number) {
    try {
      return await this.respuestasService.obtenerRespuesta(id);
    } catch (error) {
      console.error(error.message);

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(
            'Respuesta de las preguntas no encontrada',
          );
        }
      }
    }
  }

  @Post()
  @ApiOperation({
    summary: 'Crear una respuesta de las preguntas',
    description: 'Crea una respuesta de las preguntas.',
  })
  @ApiCreatedResponse({
    description: 'Respuesta de las preguntas creada',
    type: Respuesta,
  })
  async crearRespuesta(@Body() respuesta: CrearRespuestaDto) {
    try {
      return await this.respuestasService.crearRespuesta(respuesta);
    } catch (error) {
      console.error(error.message);

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2003') {
          throw new BadRequestException(
            'El id de la pregunta o el id de cuestionario no existe',
          );
        }
      }

      throw new InternalServerErrorException(
        'Error al crear la respuesta de las preguntas',
      );
    }
  }

  @Post('responder')
  @ApiOperation({
    summary: 'Crear múltiples respuestas de las preguntas',
    description: 'Crea múltiples respuestas de las preguntas.',
  })
  @ApiCreatedResponse({
    description: 'Respuestas de las preguntas creadas',
    type: [Respuesta],
  })
  async responderPreguntasCuestionario(
    @Body() respuestas: CrearRespuestaDto[],
  ) {
    try {
      return await this.respuestasService.responderPreguntasCuestionario(
        respuestas,
      );
    } catch (error) {
      console.error(error.message);

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2003') {
          throw new BadRequestException(
            'El id de la pregunta o el id de cuestionario no existe',
          );
        }
      }

      throw new InternalServerErrorException(
        'Error al crear las respuestas de las preguntas',
      );
    }
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Actualizar una respuesta de las preguntas',
    description: 'Actualiza una respuesta de las preguntas.',
  })
  @ApiOkResponse({
    description: 'Respuesta de las preguntas actualizada',
    type: Respuesta,
  })
  async actualizarRespuesta(
    @Param('id') id: number,
    @Body() respuesta: ActualizarRespuestaDto,
  ) {
    try {
      return await this.respuestasService.actualizarRespuesta(id, respuesta);
    } catch (error) {
      console.error(error.message);

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2003') {
          throw new BadRequestException(
            'El id de la pregunta o el id de cuestionario no existe',
          );
        } else if (error.code === 'P2025') {
          throw new NotFoundException(
            'Respuesta de las preguntas no encontrada',
          );
        }
      }
    }
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar una respuesta de las preguntas',
    description: 'Elimina una respuesta de las preguntas.',
  })
  @ApiOkResponse({
    description: 'Respuesta de las preguntas eliminada',
    type: Respuesta,
  })
  async eliminarRespuesta(@Param('id') id: number) {
    try {
      return await this.respuestasService.eliminarRespuesta(id);
    } catch (error) {
      console.error(error.message);

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(
            'Respuesta de las preguntas no encontrada',
          );
        }
      }
    }
  }
}
