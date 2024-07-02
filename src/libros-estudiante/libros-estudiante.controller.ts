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
  Req,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import type { Request } from 'express';
import { EstudiantesService } from '../estudiantes/estudiantes.service';
import {
  ActualizarLibroEstudianteDto,
  CrearLibroEstudianteDto,
} from './dto/libros-estudiante.dto';
import { LibroEstudiante } from './entities/libros-estudiante.entity';
import { LibrosEstudianteService } from './libros-estudiante.service';

@ApiBearerAuth('access-token')
@ApiTags('libros-estudiante')
@Controller('libros-estudiante')
export class LibrosEstudianteController {
  constructor(
    private readonly librosEstudianteService: LibrosEstudianteService,
    private readonly estudiantesService: EstudiantesService,
  ) {}

  @Get('contar')
  @ApiOperation({
    summary: 'Contar libros de estudiante',
    description: 'Devuelve el número de libros de estudiante',
  })
  @ApiOkResponse({
    description: 'Número de libros de estudiante',
    type: Number,
  })
  async contarLibrosEstudiante() {
    return await this.librosEstudianteService.contarLibrosEstudiante();
  }

  @Get('tiempo-lectura')
  @ApiOperation({
    summary: 'Obtener tiempo de lectura total',
    description:
      'Obtiene el tiempo de lectura total de todos los libros de estudiante',
  })
  @ApiOkResponse({
    description: 'Tiempo de lectura total',
    type: Number,
  })
  async obtenerTiempoDeLecturaTotal(@Req() req: Request) {
    const estudiante =
      await this.estudiantesService.obtenerEstudiantePorIdUsuario(req.user.id);
    return await this.librosEstudianteService.obtenerTiempoDeLecturaTotal(
      estudiante.id,
    );
  }

  @Get('contar/no-terminados')
  @ApiOperation({
    summary: 'Contar libros no terminados de estudiante',
    description: 'Devuelve el número de libros no terminados de estudiante',
  })
  @ApiOkResponse({
    description: 'Número de libros no terminados de estudiante',
    type: Number,
  })
  async contarLibrosNoTerminadosEstudiante(@Req() req: Request) {
    const estudiante =
      await this.estudiantesService.obtenerEstudiantePorIdUsuario(req.user.id);
    return await this.librosEstudianteService.contarLibrosNoTerminadosEstudiante(
      estudiante.id,
    );
  }

  @Get('contar/terminados')
  @ApiOperation({
    summary: 'Contar libros terminados de estudiante',
    description: 'Devuelve el número de libros terminados de estudiante',
  })
  @ApiOkResponse({
    description: 'Número de libros terminados de estudiante',
    type: Number,
  })
  async contarLibrosTerminadosEstudiante(@Req() req: Request) {
    const estudiante =
      await this.estudiantesService.obtenerEstudiantePorIdUsuario(req.user.id);
    return await this.librosEstudianteService.contarLibrosTerminadosEstudiante(
      estudiante.id,
    );
  }

  @Get('libro-estudiante/:id')
  @ApiOperation({
    summary: 'Obtener libros de estudiante por ID de libro',
    description: 'Obtiene libros de estudiante por ID de libro',
  })
  @ApiOkResponse({
    description: 'Libros de estudiante encontrados',
    type: [LibroEstudiante],
  })
  async obtenerLibroPorIdEstudiante(@Param('id') id_libro: string) {
    return await this.librosEstudianteService.obtenerLibrosPorIdLibro(
      +id_libro,
    );
  }

  @Get('estadisticas-semanales/:terminado')
  @ApiOperation({
    summary: 'Obtener estadísticas semanales de libros de estudiantes',
    description: 'Obtiene estadísticas semanales de libros de estudiantes',
  })
  @ApiOkResponse({
    description: 'Lista de estadísticas semanales de libros de estudiantes',
    type: [LibroEstudiante],
  })
  async obtenerEstadisticasSemanalesLibrosEstudianteTerminados(
    @Param('terminado') terminado: boolean,
    @Query('id_estudiante') id_estudiante: number,
    @Query('id_grado') id_grado: number,
  ) {
    return await this.librosEstudianteService.obtenerEstadisticasSemanalesLibrosEstudianteTerminados(
      terminado,
      id_estudiante,
      id_grado,
    );
  }

  @Get('estadisticas-semanales/lectura')
  @ApiOperation({
    summary:
      'Obtener estadísticas semanales de lectura de libros de estudiante',
    description:
      'Devuelve estadísticas semanales de lectura de libros de estudiante',
  })
  @ApiOkResponse({
    description:
      'Lista de estadísticas semanales de lectura de libros de estudiante',
    type: [LibroEstudiante],
  })
  async obtenerEstadisticasSemanalesProgresoEnLecturaPorEstudiante(
    @Req() req: Request,
  ) {
    const estudiante =
      await this.estudiantesService.obtenerEstudiantePorIdUsuario(req.user.id);
    return await this.librosEstudianteService.obtenerEstadisticasSemanalesProgresoEnLecturaPorEstudiante(
      estudiante.id,
    );
  }

  @Get()
  @ApiOperation({
    summary: 'Obtener todos los libros de estudiante',
    description: 'Obtiene todos los libros de estudiante',
  })
  @ApiOkResponse({
    description: 'Libros de estudiante encontrados',
    type: [LibroEstudiante],
  })
  async obtenerLibrosEstudiante() {
    return await this.librosEstudianteService.obtenerLibrosEstudiante();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener un libro de estudiante por su ID',
    description: 'Obtiene un libro de estudiante por su ID',
  })
  @ApiOkResponse({
    description: 'Libro de estudiante encontrado',
    type: LibroEstudiante,
  })
  async obtenerLibroEstudiante(@Param('id') id: string) {
    try {
      return await this.librosEstudianteService.obtenerLibroEstudiante(+id);
    } catch (error) {
      console.error(error.message);

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException('Libro de estudiante no encontrado');
        }
      }
    }
  }

  @Post()
  @ApiOperation({
    summary: 'Crear un libro de estudiante',
    description: 'Crea un libro de estudiante',
  })
  @ApiCreatedResponse({
    description: 'Libro de estudiante creado',
    type: LibroEstudiante,
  })
  async crearLibroEstudiante(@Body() libroEstudiante: CrearLibroEstudianteDto) {
    try {
      return await this.librosEstudianteService.crearLibroEstudiante(
        libroEstudiante,
      );
    } catch (error) {
      console.error(error.message);

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new BadRequestException('Libro de estudiante ya existe');
        } else if (error.code === 'P2003') {
          throw new BadRequestException(
            'El id de libro o el id de estudiante no existe',
          );
        }
      }

      throw new InternalServerErrorException(
        'Error al crear el libro de estudiante',
      );
    }
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Actualizar un libro de estudiante por su ID',
    description: 'Actualiza un libro de estudiante por su ID',
  })
  @ApiOkResponse({
    description: 'Libro de estudiante actualizado',
    type: LibroEstudiante,
  })
  async actualizarLibroEstudiante(
    @Param('id') id: string,
    @Body() libroEstudiante: ActualizarLibroEstudianteDto,
  ) {
    try {
      return await this.librosEstudianteService.actualizarLibroEstudiante(
        +id,
        libroEstudiante,
      );
    } catch (error) {
      console.error(error.message);

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new BadRequestException('El libro de estudiante ya existe');
        } else if (error.code === 'P2003') {
          throw new BadRequestException(
            'El id de libro o el id de estudiante no existe',
          );
        } else if (error.code === 'P2025') {
          throw new NotFoundException('Libro de estudiante no encontrado');
        }
      }
    }
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar un libro de estudiante por su ID',
    description: 'Elimina un libro de estudiante por su ID',
  })
  @ApiOkResponse({
    description: 'Libro de estudiante eliminado',
    type: LibroEstudiante,
  })
  async eliminarLibroEstudiante(@Param('id') id: string) {
    try {
      return await this.librosEstudianteService.eliminarLibroEstudiante(+id);
    } catch (error) {
      console.error(error.message);

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException('Libro de estudiante no encontrado');
        }
      }
    }
  }
}
