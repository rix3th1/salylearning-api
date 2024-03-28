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
import { ActualizarLibroDto, CrearLibroDto } from './dto/libros.dto';
import { Libro } from './entities/libro.entity';
import { LibrosService } from './libros.service';

@ApiBearerAuth('access-token')
@ApiTags('libros')
@Controller('libros')
export class LibrosController {
  constructor(private readonly librosService: LibrosService) {}

  @Get()
  @ApiOperation({
    summary: 'Obtener todos los libros',
    description: 'Obtener todos los libros',
  })
  @ApiOkResponse({
    description: 'Lista de libros',
    type: [Libro],
  })
  async obtenerLibros() {
    return await this.librosService.obtenerLibros();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener un libro por su ID',
    description: 'Obtener un libro por su ID',
  })
  @ApiOkResponse({
    description: 'Libro encontrado',
    type: Libro,
  })
  async obtenerLibroPorId(@Param('id') id: string) {
    try {
      return await this.librosService.obtenerLibroPorId(+id);
    } catch (error) {
      console.error(error.message);
      throw new NotFoundException('Libro no encontrado');
    }
  }

  @Post()
  @ApiOperation({
    summary: 'Crear un libro',
    description: 'Crear un libro',
  })
  @ApiCreatedResponse({
    description: 'Libro creado',
    type: Libro,
  })
  async crearLibro(@Body() libro: CrearLibroDto) {
    try {
      return await this.librosService.crearLibro(libro);
    } catch (error) {
      console.error(error.message);

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new BadRequestException('El nombre del libro ya existe');
        } else if (error.code === 'P2003') {
          throw new BadRequestException('El id de grado del libro no existe');
        }
      }

      throw new InternalServerErrorException('Error al crear el libro');
    }
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Actualizar un libro',
    description: 'Actualizar un libro',
  })
  @ApiOkResponse({
    description: 'Libro actualizado',
    type: Libro,
  })
  async actualizarLibro(
    @Param('id') id: string,
    @Body() libro: ActualizarLibroDto,
  ) {
    try {
      return await this.librosService.actualizarLibro(+id, libro);
    } catch (error) {
      console.error(error.message);

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new BadRequestException('El nombre del libro ya existe');
        } else if (error.code === 'P2003') {
          throw new BadRequestException('El id de grado del libro no existe');
        }
      }

      throw new NotFoundException('Libro no encontrado');
    }
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar un libro',
    description: 'Eliminar un libro',
  })
  @ApiOkResponse({
    description: 'Libro eliminado',
    type: Libro,
  })
  async eliminarLibro(@Param('id') id: string) {
    try {
      return await this.librosService.eliminarLibro(+id);
    } catch (error) {
      console.error(error.message);
      throw new NotFoundException('Libro no encontrado');
    }
  }
}
