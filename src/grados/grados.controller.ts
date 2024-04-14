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
import { Public } from '../public.decorator';
import { ActualizarGradoDto, CrearGradoDto } from './dto/grados.dto';
import { Grado } from './entities/grado.entity';
import { GradosService } from './grados.service';

@ApiTags('grados')
@Controller('grados')
export class GradosController {
  constructor(private readonly gradosService: GradosService) {}

  @Get()
  @Public()
  @ApiTags('publico')
  @ApiOperation({
    summary: 'Obtener todos los grados',
    description: 'Devuelve una lista de todos los grados',
  })
  @ApiOkResponse({
    description: 'Lista de grados',
    type: [Grado],
  })
  async obtenerGrados() {
    return await this.gradosService.obtenerGrados();
  }

  @ApiBearerAuth('access-token')
  @Get(':id')
  @ApiOperation({
    summary: 'Obtener un grado por su ID',
    description: 'Devuelve el grado con el ID especificado',
  })
  @ApiOkResponse({
    description: 'Grado encontrado',
    type: Grado,
  })
  async obtenerGrado(@Param('id') id: string) {
    try {
      return await this.gradosService.obtenerGrado(+id);
    } catch (error) {
      console.error(error.message);

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException('No se encontró el grado solicitado');
        }
      }
    }
  }

  @ApiBearerAuth('access-token')
  @Post()
  @ApiOperation({
    summary: 'Crear un grado',
    description: 'Crea un grado.',
  })
  @ApiCreatedResponse({
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

  @ApiBearerAuth('access-token')
  @Patch(':id')
  @ApiOperation({
    summary: 'Actualizar un grado',
    description: 'Actualiza un grado.',
  })
  @ApiOkResponse({
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
        } else if (error.code === 'P2025') {
          throw new NotFoundException('No se encontró el grado solicitado');
        }
      }
    }
  }

  @ApiBearerAuth('access-token')
  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar un grado',
    description: 'Elimina un grado.',
  })
  @ApiOkResponse({
    description: 'Grado eliminado',
    type: Grado,
  })
  async eliminarGrado(@Param('id') id: string) {
    try {
      return await this.gradosService.eliminarGrado(+id);
    } catch (error) {
      console.error(error.message);

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException('No se encontró el grado solicitado');
        }
      }
    }
  }
}
