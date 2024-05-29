import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
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
import { isIn } from 'class-validator';
import { CuestionariosService } from './cuestionarios.service';
import {
  ActualizarCuestionarioDto,
  CrearCuestionarioDto,
} from './dto/cuestionario.dto';
import { Cuestionario } from './entities/cuestionario.entity';

@ApiBearerAuth('access-token')
@ApiTags('cuestionarios')
@Controller('cuestionarios')
export class CuestionariosController {
  constructor(private readonly cuestionariosService: CuestionariosService) {}

  @Get('contar')
  @ApiOperation({
    summary: 'Contar todos los cuestionarios',
    description: 'Cuenta todos los cuestionarios de la base de datos',
  })
  @ApiOkResponse({
    description: 'Número de cuestionarios',
    type: Number,
  })
  async contarCuestionarios() {
    return await this.cuestionariosService.contarCuestionarios();
  }

  @Get('contar/estado')
  @ApiOperation({
    summary: `Contar todos los cuestionarios por estado: ${Object.values(
      EstadoCuestionario,
    ).join(', ')}`,
    description: `Cuenta cuestionarios de la base de datos por su estado: ${Object.values(
      EstadoCuestionario,
    ).join(', ')}`,
  })
  @ApiOkResponse({
    description: 'Número de cuestionarios por estado',
    type: Number,
  })
  async contarCuestionariosPorEstado(
    @Query('estado_cuestionario') estado: EstadoCuestionario,
  ) {
    try {
      const estadoCuestionario = estado.toUpperCase() as EstadoCuestionario;

      if (!isIn(estadoCuestionario, Object.values(EstadoCuestionario))) {
        throw new BadRequestException('Estado de cuestionario no válido');
      }

      return await this.cuestionariosService.contarCuestionariosPorEstado(
        estadoCuestionario,
      );
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }

      throw new BadRequestException('Estado de cuestionario no válido');
    }
  }

  @Get()
  @ApiOperation({
    summary: 'Obtener todos los cuestionarios',
    description: 'Obtiene todos los cuestionarios de la base de datos',
  })
  @ApiOkResponse({
    description: 'Lista de cuestionarios en la base de datos',
    type: [Cuestionario],
  })
  async obtenerCuestionarios() {
    return await this.cuestionariosService.obtenerCuestionarios();
  }

  @Get('estado')
  @ApiOperation({
    summary: `Obtener cuestionarios por estado: ${Object.values(
      EstadoCuestionario,
    ).join(', ')}`,
    description: `Obtiene cuestionarios de la base de datos por su estado: ${Object.values(
      EstadoCuestionario,
    ).join(', ')}`,
  })
  @ApiOkResponse({
    description: 'Lista de cuestionarios por estado',
    type: [Cuestionario],
  })
  async obtenerCuestionariosPorEstado(
    @Query('estado_cuestionario') estado: EstadoCuestionario,
  ) {
    try {
      const estadoCuestionario = estado.toUpperCase() as EstadoCuestionario;

      if (!isIn(estadoCuestionario, Object.values(EstadoCuestionario))) {
        throw new BadRequestException('Estado de cuestionario no válido');
      }

      return await this.cuestionariosService.obtenerCuestionariosPorEstado(
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
    summary: 'Obtener un cuestionario por su ID',
    description: 'Obtiene un cuestionario de la base de datos por su ID',
  })
  @ApiOkResponse({
    description: 'Cuestionario encontrado',
    type: Cuestionario,
  })
  async obtenerCuestionario(@Param('id') id: string) {
    try {
      return await this.cuestionariosService.obtenerCuestionario(+id);
    } catch (error) {
      console.error(error.message);

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException('Cuestionario no encontrado');
        }
      }
    }
  }

  @Post()
  @ApiOperation({
    summary: 'Crear un cuestionario',
    description: 'Crea un cuestionario en la base de datos',
  })
  @ApiCreatedResponse({
    description: 'Cuestionario creado',
    type: Cuestionario,
  })
  async crearCuestionario(@Body() cuestionario: CrearCuestionarioDto) {
    try {
      return await this.cuestionariosService.crearCuestionario(cuestionario);
    } catch (error) {
      console.error(error.message);

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2003') {
          throw new BadRequestException('El id de pregunta no existe');
        }
      }

      throw new BadRequestException('Error al crear el cuestionario');
    }
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Actualizar un cuestionario',
    description: 'Actualiza un cuestionario en la base de datos',
  })
  @ApiOkResponse({
    description: 'Cuestionario actualizado',
    type: Cuestionario,
  })
  async actualizarCuestionario(
    @Param('id') id: string,
    @Body() cuestionario: ActualizarCuestionarioDto,
  ) {
    try {
      return await this.cuestionariosService.actualizarCuestionario(
        +id,
        cuestionario,
      );
    } catch (error) {
      console.error(error.message);

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2003') {
          throw new BadRequestException('El id de pregunta no existe');
        } else if (error.code === 'P2025') {
          throw new NotFoundException('Cuestionario no encontrado');
        }
      }
    }
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar un cuestionario',
    description: 'Elimina un cuestionario de la base de datos',
  })
  @ApiOkResponse({
    description: 'Cuestionario eliminado',
    type: Cuestionario,
  })
  async eliminarCuestionario(@Param('id') id: string) {
    try {
      return await this.cuestionariosService.eliminarCuestionario(+id);
    } catch (error) {
      console.error(error.message);

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException('Cuestionario no encontrado');
        }
      }
    }
  }
}
