import {
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
  ActualizarGeneroLiterarioDto,
  CrearGeneroLiterarioDto,
} from './dto/genero-literario.dto';
import { GeneroLiterario } from './entities/genero-literario.entity';
import { GenerosLiterariosService } from './generos-literarios.service';

@ApiBearerAuth('access-token')
@ApiTags('generos-literarios')
@Controller('generos-literarios')
export class GenerosLiterariosController {
  constructor(
    private readonly generosLiterariosService: GenerosLiterariosService,
  ) {}

  @Get('contar')
  @ApiOperation({
    summary: 'Contar géneros literarios',
    description: 'Devuelve el número de géneros literarios',
  })
  @ApiOkResponse({
    description: 'Número de géneros literarios',
    type: Number,
  })
  async contarGenerosLiterarios() {
    return await this.generosLiterariosService.contarGenerosLiterarios();
  }

  @Get()
  @ApiOperation({
    summary: 'Obtener todos los géneros literarios',
    description: 'Devuelve una lista de todos los géneros literarios',
  })
  @ApiOkResponse({
    description: 'Lista de géneros literarios',
    type: [GeneroLiterario],
  })
  async obtenerGenerosLiterarios() {
    return await this.generosLiterariosService.obtenerGenerosLiterarios();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener un género literario',
    description: 'Devuelve un género literario por su ID',
  })
  @ApiOkResponse({
    description: 'Género literario encontrado',
    type: GeneroLiterario,
  })
  async obtenerGeneroLiterario(@Param('id') id: string) {
    try {
      return await this.generosLiterariosService.obtenerGeneroLiterario(+id);
    } catch (error) {
      console.error(error.message);

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException('El género literario no existe');
        }
      }
    }
  }

  @Post()
  @ApiOperation({
    summary: 'Crear un género literario',
    description: 'Crea un nuevo género literario',
  })
  @ApiCreatedResponse({
    description: 'Género literario creado',
    type: GeneroLiterario,
  })
  async crearGeneroLiterario(@Body() generoLiterario: CrearGeneroLiterarioDto) {
    try {
      return await this.generosLiterariosService.crearGeneroLiterario(
        generoLiterario,
      );
    } catch (error) {
      console.error(error.message);

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new NotFoundException(
            'Ya existe un género literario con el mismo nombre',
          );
        }
      }

      throw new InternalServerErrorException(
        'Error al crear el género literario',
      );
    }
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Actualizar un género literario',
    description: 'Actualiza un género literario por su ID',
  })
  @ApiOkResponse({
    description: 'Género literario actualizado',
    type: GeneroLiterario,
  })
  async actualizarGeneroLiterario(
    @Param('id') id: string,
    @Body() generoLiterario: ActualizarGeneroLiterarioDto,
  ) {
    try {
      return await this.generosLiterariosService.actualizarGeneroLiterario(
        +id,
        generoLiterario,
      );
    } catch (error) {
      console.error(error.message);

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new NotFoundException(
            'Ya existe un género literario con el mismo nombre',
          );
        } else if (error.code === 'P2025') {
          throw new NotFoundException('El género literario no existe');
        }
      }
    }
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar un género literario',
    description: 'Elimina un género literario por su ID',
  })
  @ApiOkResponse({
    description: 'Género literario eliminado',
    type: GeneroLiterario,
  })
  async eliminarGeneroLiterario(@Param('id') id: string) {
    try {
      return await this.generosLiterariosService.eliminarGeneroLiterario(+id);
    } catch (error) {
      console.error(error.message);

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException('El género literario no existe');
        }
      }
    }
  }
}
