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
import { EstudiantesService } from '../estudiantes/estudiantes.service';
import { CuestionarioEstudianteService } from './cuestionario-estudiante.service';
import {
  ActualizarCuestionarioEstudianteDto,
  CrearCuestionarioEstudianteDto,
  asignarCuestionarioEstudianteATodosLosEstudiantesDto,
} from './dto/cuestionario-estudiante.dto';
import { isIn } from 'class-validator';
import { CuestionarioEstudiante } from './entities/cuestionario-estudiante.entity';

@ApiBearerAuth('access-token')
@ApiTags('cuestionario-estudiante')
@Controller('cuestionario-estudiante')
export class CuestionarioEstudianteController {
  constructor(
    private readonly cuestionarioEstudianteService: CuestionarioEstudianteService,
    private readonly estudianteService: EstudiantesService,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'Obtener todos los cuestionarios de estudiantes',
    description: 'Obtiene todos los cuestionarios de estudiantes existentes.',
  })
  @ApiOkResponse({
    description: 'Cuestionarios de estudiantes encontrados',
    type: [CuestionarioEstudiante],
  })
  async obtenerCuestionariosEstudiantes() {
    return await this.cuestionarioEstudianteService.obtenerCuestionariosEstudiante();
  }

  @Get('contar/preguntas-correctas/:id_estudiante')
  @ApiOperation({
    summary: 'Contar preguntas correctas',
    description: 'Devuelve el número de preguntas correctas de estudiante',
  })
  @ApiOkResponse({
    description: 'Número de preguntas correctas de estudiante',
    type: Number,
  })
  async contarPreguntasCorrectas(
    @Param('id_estudiante') id_estudiante: string,
  ) {
    return await this.cuestionarioEstudianteService.contarPreguntasCorrectas(
      +id_estudiante,
    );
  }

  @Get('estadisticas-semanales/preguntas-correctas/:id_estudiante')
  @ApiOperation({
    summary:
      'Obtener estadísticas semanales de preguntas correctas de cuestionarios de estudiante',
    description:
      'Devuelve estadísticas semanales de preguntas correctas de cuestionarios de estudiante',
  })
  @ApiOkResponse({
    description:
      'Lista de estadísticas semanales de preguntas correctas de cuestionarios de estudiante',
    type: [CuestionarioEstudiante],
  })
  async obtenerEstadisticasSemanalesPreguntasCorrectasPorEstudiante(
    @Param('id_estudiante') id_estudiante: string,
  ) {
    return await this.cuestionarioEstudianteService.obtenerEstadisticasSemanalesPreguntasCorrectasPorEstudiante(
      +id_estudiante,
    );
  }

  @Get('estado')
  @ApiOperation({
    summary: `Obtener cuestionarios de estudiantes por estado: ${Object.values(
      EstadoCuestionario,
    ).join(', ')}`,
    description: `Obtiene cuestionarios de estudiantes por su estado: ${Object.values(
      EstadoCuestionario,
    ).join(', ')}`,
  })
  @ApiOkResponse({
    description: 'Lista de cuestionarios de estudiantes por estado',
    type: [CuestionarioEstudiante],
  })
  async obtenerCuestionariosEstudiantesPorEstado(
    @Query('estado_cuestionario_estudiante') estado: EstadoCuestionario,
  ) {
    try {
      const estadoCuestionario = estado.toUpperCase() as EstadoCuestionario;

      if (!isIn(estadoCuestionario, Object.values(EstadoCuestionario))) {
        throw new BadRequestException('Estado de cuestionario no válido');
      }

      return await this.cuestionarioEstudianteService.obtenerCuestionariosEstudiantesPorEstado(
        estadoCuestionario,
      );
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }

      throw new BadRequestException('Estado de cuestionario no válido');
    }
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener un cuestionario de estudiante por su ID',
    description: 'Obtiene un cuestionario de estudiante por su ID.',
  })
  @ApiOkResponse({
    description: 'Cuestionario de estudiante encontrado',
    type: CuestionarioEstudiante,
  })
  async obtenerCuestionarioEstudiante(@Param('id') id: string) {
    try {
      return await this.cuestionarioEstudianteService.obtenerCuestionarioEstudiante(
        +id,
      );
    } catch (error) {
      console.error(error.message);

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(
            'Cuestionario de estudiante no encontrado',
          );
        }
      }
    }
  }

  @Post('asignar')
  @ApiOperation({
    summary: 'Asignar un cuestionario de estudiante a todos los estudiantes',
    description:
      'Asigna un cuestionario de estudiante a todos los estudiantes.',
  })
  @ApiCreatedResponse({
    description: 'Cuestionario de estudiante asignado',
    type: CuestionarioEstudiante,
  })
  async asignarCuestionarioEstudianteATodosLosEstudiantes(
    @Body()
    cuestionarioEstudiante: asignarCuestionarioEstudianteATodosLosEstudiantesDto,
  ) {
    try {
      const estudiantes = await this.estudianteService.obtenerEstudiantes();

      for (const estudiante of estudiantes) {
        await this.cuestionarioEstudianteService.asignarCuestionarioEstudianteATodosLosEstudiantes(
          {
            id_cuestionario: cuestionarioEstudiante.id_cuestionario,
            id_estudiante: estudiante.id,
          },
        );
      }

      return {
        message: 'Cuestionario asignado a todos los estudiantes',
      };
    } catch (error) {
      console.error(error.message);

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2003') {
          throw new BadRequestException(
            'El id de cuestionario de estudiante o el id de estudiante no existe',
          );
        }
      }

      throw new InternalServerErrorException(
        'Error al crear el cuestionario de estudiante',
      );
    }
  }

  @Post()
  @ApiOperation({
    summary: 'Crear un cuestionario de estudiante',
    description: 'Crea un cuestionario de estudiante.',
  })
  @ApiCreatedResponse({
    description: 'Cuestionario de estudiante creado',
    type: CuestionarioEstudiante,
  })
  async crearCuestionarioEstudiante(
    @Body() cuestionarioEstudiante: CrearCuestionarioEstudianteDto,
  ) {
    try {
      return await this.cuestionarioEstudianteService.crearCuestionarioEstudiante(
        cuestionarioEstudiante,
      );
    } catch (error) {
      console.error(error.message);

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2003') {
          throw new BadRequestException(
            'El id de cuestionario de estudiante o el id de estudiante no existe',
          );
        }
      }

      throw new InternalServerErrorException(
        'Error al crear el cuestionario de estudiante',
      );
    }
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Actualizar un cuestionario de estudiante',
    description: 'Actualiza un cuestionario de estudiante.',
  })
  @ApiOkResponse({
    description: 'Cuestionario de estudiante actualizado',
    type: CuestionarioEstudiante,
  })
  async actualizarCuestionarioEstudiante(
    @Param('id') id: string,
    @Body() cuestionarioEstudiante: ActualizarCuestionarioEstudianteDto,
  ) {
    try {
      return await this.cuestionarioEstudianteService.actualizarCuestionarioEstudiante(
        +id,
        cuestionarioEstudiante,
      );
    } catch (error) {
      console.error(error.message);

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2003') {
          throw new BadRequestException(
            'El id de cuestionario de estudiante o el id de estudiante no existe',
          );
        } else if (error.code === 'P2025') {
          throw new NotFoundException(
            'Cuestionario de estudiante no encontrado',
          );
        }
      }
    }
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar un cuestionario de estudiante',
    description: 'Elimina un cuestionario de estudiante.',
  })
  @ApiOkResponse({
    description: 'Cuestionario de estudiante eliminado',
    type: CuestionarioEstudiante,
  })
  async eliminarCuestionarioEstudiante(@Param('id') id: string) {
    try {
      return await this.cuestionarioEstudianteService.eliminarCuestionarioEstudiante(
        +id,
      );
    } catch (error) {
      console.error(error.message);

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(
            'Cuestionario de estudiante no encontrado',
          );
        }
      }
    }
  }
}
