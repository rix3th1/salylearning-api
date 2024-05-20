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
import {
  ActualizarEstudianteDto,
  CrearEstudianteDto,
} from './dto/estudiantes.dto';
import { Estudiante } from './entities/estudiante.entity';
import { EstudiantesService } from './estudiantes.service';

@ApiBearerAuth('access-token')
@ApiTags('estudiantes')
@Controller('estudiantes')
export class EstudiantesController {
  constructor(private estudiantesService: EstudiantesService) {}

  @Get()
  @ApiOperation({
    summary: 'Obtener todos los estudiantes',
    description: 'Obtiene todos los estudiantes existentes.',
  })
  @ApiOkResponse({
    description: 'Estudiantes encontrados',
    type: [Estudiante],
  })
  async obtenerEstudiantes() {
    return await this.estudiantesService.obtenerEstudiantes();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener un estudiante por su ID',
    description: 'Obtiene un estudiante por su ID.',
  })
  @ApiOkResponse({
    description: 'Estudiante encontrado',
    type: Estudiante,
  })
  async obtenerEstudiante(@Param('id') id: string) {
    try {
      return await this.estudiantesService.obtenerEstudiante(+id);
    } catch (error) {
      console.error(error.message);

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(
            'No se encontró el estudiante con el ID proporcionado',
          );
        }
      }
    }
  }

  @Get('usuario/:id_usuario')
  @ApiOperation({
    summary: 'Obtener un estudiante por su ID de usuario',
    description: 'Obtiene un estudiante por su ID de usuario.',
  })
  @ApiOkResponse({
    description: 'Estudiante encontrado',
    type: Estudiante,
  })
  async obtenerEstudiantePorIdUsuario(@Param('id_usuario') id_usuario: string) {
    try {
      return await this.estudiantesService.obtenerEstudiantePorIdUsuario(
        +id_usuario,
      );
    } catch (error) {
      console.error(error.message);

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(
            'No se encontró el estudiante con el ID de usuario proporcionado',
          );
        }
      }
    }
  }

  @Post()
  @ApiOperation({
    summary: 'Crear un estudiante',
    description: 'Crea un nuevo estudiante.',
  })
  @ApiCreatedResponse({
    description: 'Estudiante creado',
    type: Estudiante,
  })
  async crearEstudiante(@Body() estudiante: CrearEstudianteDto) {
    try {
      return await this.estudiantesService.crearEstudiante(estudiante);
    } catch (error) {
      console.error(error.message);

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new BadRequestException(
            'Ya existe un estudiante con el mismo usuario o con el mismo codigo de estudiante',
          );
        } else if (error.code === 'P2003') {
          throw new BadRequestException(
            'El id de usuario proporcionado no existe',
          );
        }
      }

      throw new InternalServerErrorException('Error al crear el estudiante');
    }
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Actualizar un estudiante',
    description: 'Actualiza un estudiante existente.',
  })
  @ApiOkResponse({
    description: 'Estudiante actualizado',
    type: Estudiante,
  })
  async actualizarEstudiante(
    @Param('id') id: string,
    @Body() estudiante: ActualizarEstudianteDto,
  ) {
    try {
      return await this.estudiantesService.actualizarEstudiante(
        +id,
        estudiante,
      );
    } catch (error) {
      console.error(error.message);

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new BadRequestException(
            'Ya existe un estudiante con el mismo usuario o con el mismo codigo de estudiante',
          );
        } else if (error.code === 'P2003') {
          throw new BadRequestException(
            'El id de usuario proporcionado no existe',
          );
        } else if (error.code === 'P2025') {
          throw new NotFoundException(
            'No se encontró el estudiante con el ID proporcionado',
          );
        }
      }
    }
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar un estudiante',
    description: 'Elimina un estudiante existente.',
  })
  @ApiOkResponse({
    description: 'Estudiante eliminado',
    type: Estudiante,
  })
  async eliminarEstudiante(@Param('id') id: string) {
    try {
      return await this.estudiantesService.eliminarEstudiante(+id);
    } catch (error) {
      console.error(error.message);

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(
            'No se encontró el estudiante con el ID proporcionado',
          );
        }
      }
    }
  }
}
