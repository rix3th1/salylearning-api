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
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { EstadoCuestionario, Prisma } from '@prisma/client';
import { ActualizarPreguntaDto, CrearPreguntaDto } from './dto/preguntas.dto';
import { Pregunta } from './entities/pregunta.entity';
import { PreguntasService } from './preguntas.service';
import { isIn } from 'class-validator';

@ApiBearerAuth('access-token')
@ApiTags('preguntas')
@Controller('preguntas')
export class PreguntasController {
  constructor(private readonly preguntasService: PreguntasService) {}

  @Get('contar')
  @ApiOperation({
    summary: 'Contar todas las preguntas',
    description: 'Cuenta todas las preguntas de la base de datos',
  })
  @ApiOkResponse({
    description: 'Número de preguntas',
    type: Number,
  })
  async contarPreguntas() {
    return await this.preguntasService.contarPreguntas();
  }

  @Get('contar-pendientes')
  @ApiOperation({
    summary: 'Contar todas las preguntas pendientes',
    description: 'Cuenta todas las preguntas pendientes de la base de datos',
  })
  @ApiOkResponse({
    description: 'Número de preguntas pendientes',
    type: Number,
  })
  async contarPreguntasPendientes() {
    return await this.preguntasService.contarPreguntasPendientes();
  }

  @Get('contar-no-logradas')
  @ApiOperation({
    summary: 'Contar todas las preguntas no logradas',
    description: 'Cuenta todas las preguntas no logradas de la base de datos',
  })
  @ApiOkResponse({
    description: 'Número de preguntas no logradas',
    type: Number,
  })
  async contarPreguntasNoLogradas() {
    return await this.preguntasService.contarPreguntasNoLogradas();
  }

  @Get('contar-completadas')
  @ApiOperation({
    summary: 'Contar todas las preguntas completadas',
    description: 'Cuenta todas las preguntas completadas de la base de datos',
  })
  @ApiOkResponse({
    description: 'Número de preguntas completadas',
    type: Number,
  })
  async contarPreguntasCompletadas() {
    return await this.preguntasService.contarPreguntasCompletadas();
  }

  @Get()
  @ApiOperation({
    summary: 'Obtener todas las preguntas',
    description: 'Obtiene todas las preguntas de la base de datos',
  })
  @ApiOkResponse({
    description: 'Lista de preguntas',
    type: [Pregunta],
  })
  async obtenerPreguntas() {
    return await this.preguntasService.obtenerPreguntas();
  }

  @Get('estado')
  @ApiOperation({
    summary: `Obtener preguntas por estado: ${Object.values(EstadoCuestionario).join(', ')}`,
    description: `Obtiene preguntas de la base de datos por su estado: ${Object.values(
      EstadoCuestionario,
    ).join(', ')}`,
  })
  @ApiOkResponse({
    description: 'Lista de preguntas',
    type: [Pregunta],
  })
  async obtenerPreguntasPorEstado(
    @Query('estado_cuestionario') estado: EstadoCuestionario,
  ) {
    const estadoCuestionario = estado.toUpperCase() as EstadoCuestionario;

    if (!isIn(estadoCuestionario, Object.values(EstadoCuestionario))) {
      throw new BadRequestException('Estado de cuestionario no válido');
    }

    return await this.preguntasService.obtenerPreguntasPorEstado(
      estadoCuestionario,
    );
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener una pregunta por su ID',
    description: 'Obtiene una pregunta de la base de datos por su ID',
  })
  @ApiOkResponse({
    description: 'Pregunta encontrada',
    type: Pregunta,
  })
  async obtenerPregunta(@Param('id') id: string) {
    try {
      return await this.preguntasService.obtenerPregunta(+id);
    } catch (error) {
      console.error(error.message);

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException('Pregunta no encontrada');
        }
      }
    }
  }

  @Post()
  @ApiOperation({
    summary: 'Crear una pregunta',
    description: 'Crea una pregunta en la base de datos',
  })
  @ApiCreatedResponse({
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
  @ApiOkResponse({
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
        } else if (error.code === 'P2025') {
          throw new NotFoundException('Pregunta no encontrada');
        }
      }
    }
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar una pregunta',
    description: 'Elimina una pregunta de la base de datos',
  })
  @ApiOkResponse({
    description: 'Pregunta eliminada',
    type: Pregunta,
  })
  async eliminarPregunta(@Param('id') id: string) {
    try {
      return await this.preguntasService.eliminarPregunta(+id);
    } catch (error) {
      console.error(error.message);

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException('Pregunta no encontrada');
        }
      }
    }
  }
}
