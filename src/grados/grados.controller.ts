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
import { Public } from 'decorators/public.decorator';
import { ActualizarGradoDto, CrearGradoDto } from './dto/grados.dto';
import { Grado } from './entities/grado.entity';
import { GradosService } from './grados.service';

@ApiTags('grados')
@Controller('grados')
export class GradosController {
  constructor(private readonly gradosService: GradosService) {}

  @Get()
  @Public()
  @ApiOperation({
    summary: 'Obtener todos los grados',
    description: 'Devuelve una lista de todos los grados',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de grados',
    type: [Grado],
  })
  async obtenerGrados() {
    return await this.gradosService.obtenerGrados();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener un grado por su ID',
    description: 'Devuelve el grado con el ID especificado',
  })
  @ApiResponse({
    status: 200,
    description: 'Grado encontrado',
    type: Grado,
  })
  async obtenerGrado(@Param('id') id: string) {
    try {
      return await this.gradosService.obtenerGrado(+id);
    } catch (error) {
      console.error(error.message);
      throw new NotFoundException('No se encontró el grado solicitado');
    }
  }

  @Post()
  @ApiOperation({
    summary: 'Crear un grado',
    description: 'Crea un grado.',
  })
  @ApiResponse({
    status: 201,
    description: 'Grado creado',
    type: Grado,
  })
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
  @ApiOperation({
    summary: 'Actualizar un grado',
    description: 'Actualiza un grado.',
  })
  @ApiResponse({
    status: 200,
    description: 'Grado actualizado',
    type: Grado,
  })
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
  @ApiOperation({
    summary: 'Eliminar un grado',
    description: 'Elimina un grado.',
  })
  @ApiResponse({
    status: 200,
    description: 'Grado eliminado',
    type: Grado,
  })
  async eliminarGrado(@Param('id') id: string) {
    try {
      return await this.gradosService.eliminarGrado(+id);
    } catch (error) {
      console.error(error.message);
      throw new NotFoundException('No se encontró el grado solicitado');
    }
  }
}
