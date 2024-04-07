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
import { DocentesService } from './docentes.service';
import { ActualizarDocenteDto, CrearDocenteDto } from './dto/docentes.dto';
import { Docente } from './entities/docente.entity';

@ApiBearerAuth('access-token')
@ApiTags('docentes')
@Controller('docentes')
export class DocentesController {
  constructor(private readonly docentesService: DocentesService) {}

  @Get()
  @ApiOperation({
    summary: 'Obtener todos los docentes',
    description: 'Obtiene todos los docentes existentes.',
  })
  @ApiOkResponse({
    description: 'Docentes encontrados',
    type: [Docente],
  })
  async obtenerDocentes() {
    return await this.docentesService.obtenerDocentes();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener un docente por su ID',
    description: 'Obtiene un docente por su ID.',
  })
  @ApiOkResponse({
    description: 'Docente encontrado',
    type: Docente,
  })
  async obtenerDocente(@Param('id') id: string) {
    try {
      return await this.docentesService.obtenerDocente(+id);
    } catch (error) {
      console.error(error.message);
      throw new NotFoundException(
        'No se encontró el docente con el ID proporcionado',
      );
    }
  }

  @Post()
  @ApiOperation({
    summary: 'Crear un docente',
    description: 'Crea un nuevo docente.',
  })
  @ApiCreatedResponse({
    description: 'Docente creado',
    type: Docente,
  })
  async crearDocente(@Body() docente: CrearDocenteDto) {
    try {
      return await this.docentesService.crearDocente(docente);
    } catch (error) {
      console.error(error.message);

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new BadRequestException(
            'Ya existe un docente con el mismo usuario o con el mismo codigo de docente',
          );
        } else if (error.code === 'P2003') {
          throw new BadRequestException(
            'No se pudo crear el docente porque el id de usuario proporcionado no existe',
          );
        }
      }

      throw new InternalServerErrorException(
        'Ocurrió un error al intentar crear el docente',
      );
    }
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Actualizar un docente',
    description: 'Actualiza un docente existente.',
  })
  @ApiOkResponse({
    description: 'Docente actualizado',
    type: Docente,
  })
  async actualizarDocente(
    @Param('id') id: string,
    @Body() docente: ActualizarDocenteDto,
  ) {
    try {
      return await this.docentesService.actualizarDocente(+id, docente);
    } catch (error) {
      console.error(error.message);

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new BadRequestException(
            'Ya existe un docente con el mismo usuario o con el mismo codigo de docente',
          );
        } else if (error.code === 'P2003') {
          throw new BadRequestException(
            'No se pudo actualizar el docente porque el id de usuario proporcionado no existe',
          );
        }
      }

      throw new NotFoundException(
        'No se encontró el docente con el ID proporcionado',
      );
    }
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar un docente',
    description: 'Elimina un docente existente.',
  })
  @ApiOkResponse({
    description: 'Docente eliminado',
    type: Docente,
  })
  async eliminarDocente(@Param('id') id: string) {
    try {
      return await this.docentesService.eliminarDocente(+id);
    } catch (error) {
      console.error(error.message);
      throw new NotFoundException(
        'No se encontró el docente con el ID proporcionado',
      );
    }
  }
}