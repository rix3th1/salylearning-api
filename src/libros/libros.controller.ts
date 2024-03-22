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
import { Prisma } from '@prisma/client';
import { ActualizarLibroDto, CrearLibroDto } from './dto/libros.dto';
import { LibrosService } from './libros.service';

@Controller('libros')
export class LibrosController {
  constructor(private readonly librosService: LibrosService) {}

  @Get()
  async obtenerLibros() {
    return await this.librosService.obtenerLibros();
  }

  @Get(':id')
  async obtenerLibroPorId(@Param('id') id: string) {
    try {
      return await this.librosService.obtenerLibroPorId(+id);
    } catch (error) {
      console.error({ error });
      throw new NotFoundException('Libro no encontrado');
    }
  }

  @Post()
  async crearLibro(@Body() libro: CrearLibroDto) {
    try {
      return await this.librosService.crearLibro(libro);
    } catch (error) {
      console.error({ error });

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new BadRequestException('El nombre del libro ya existe');
        }
      }

      throw new InternalServerErrorException('Error al crear el libro');
    }
  }

  @Patch(':id')
  async actualizarLibro(
    @Param('id') id: string,
    @Body() libro: ActualizarLibroDto,
  ) {
    try {
      return await this.librosService.actualizarLibro(+id, libro);
    } catch (error) {
      console.error({ error });

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new BadRequestException('El nombre del libro ya existe');
        }
      }

      throw new InternalServerErrorException('Error al crear el libro');
    }
  }

  @Delete(':id')
  async eliminarLibro(@Param('id') id: string) {
    try {
      return await this.librosService.eliminarLibro(+id);
    } catch (error) {
      console.error({ error });
      throw new NotFoundException('Libro no encontrado');
    }
  }
}