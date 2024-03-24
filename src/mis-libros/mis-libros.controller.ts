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
import { MisLibrosService } from './mis-libros.service';
import { ActualizarMiLibroDto, CrearMiLibroDto } from './dto/mis-libros.dto';
import { Prisma } from '@prisma/client';

@Controller('mis-libros')
export class MisLibrosController {
  constructor(private readonly misLibrosService: MisLibrosService) {}

  @Get()
  async obtenerMisLibros() {
    return await this.misLibrosService.obtenerMisLibros();
  }

  @Get(':id')
  async obtenerMiLibro(@Param('id') id: string) {
    try {
      return await this.misLibrosService.obtenerMiLibro(+id);
    } catch (error) {
      console.error(error.message);
      throw new NotFoundException('Libro no encontrado');
    }
  }

  @Post()
  async crearMiLibro(@Body() crearMiLibroDto: CrearMiLibroDto) {
    try {
      return await this.misLibrosService.crearMiLibro(crearMiLibroDto);
    } catch (error) {
      console.error(error.message);

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new BadRequestException('El libro ya existe');
        } else if (error.code === 'P2003') {
          throw new BadRequestException(
            'El id de usuario o el id de libro no existe',
          );
        }
      }

      throw new InternalServerErrorException('Error al crear el libro');
    }
  }

  @Patch(':id')
  async actualizarMiLibro(
    @Param('id') id: string,
    @Body() actualizarMiLibroDto: ActualizarMiLibroDto,
  ) {
    try {
      return await this.misLibrosService.actualizarMiLibro(
        +id,
        actualizarMiLibroDto,
      );
    } catch (error) {
      console.error(error.message);

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new BadRequestException('El libro ya existe');
        } else if (error.code === 'P2003') {
          throw new BadRequestException(
            'El id de usuario o el id de libro no existe',
          );
        }
      }

      throw new NotFoundException('Libro no encontrado');
    }
  }

  @Delete(':id')
  async eliminarMiLibro(@Param('id') id: string) {
    try {
      return await this.misLibrosService.eliminarMiLibro(+id);
    } catch (error) {
      console.error(error.message);
      throw new NotFoundException('Libro no encontrado');
    }
  }
}
