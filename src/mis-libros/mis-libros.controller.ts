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
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { ActualizarMiLibroDto, CrearMiLibroDto } from './dto/mis-libros.dto';
import { MiLibro } from './entities/mi-libro.entity';
import { MisLibrosService } from './mis-libros.service';

@ApiBearerAuth('access-token')
@ApiTags('mis-libros')
@Controller('mis-libros')
export class MisLibrosController {
  constructor(private readonly misLibrosService: MisLibrosService) {}

  @Get()
  @ApiOperation({
    summary: 'Obtener todos los libros',
    description: 'Obtiene todos los libros del usuario',
  })
  @ApiResponse({
    status: 200,
    description: 'Libros encontrados',
    type: [MiLibro],
  })
  async obtenerMisLibros() {
    return await this.misLibrosService.obtenerMisLibros();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener un libro por su ID',
    description: 'Obtiene un libro por su ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Libro encontrado',
    type: MiLibro,
  })
  async obtenerMiLibro(@Param('id') id: string) {
    try {
      return await this.misLibrosService.obtenerMiLibro(+id);
    } catch (error) {
      console.error(error.message);
      throw new NotFoundException('Libro no encontrado');
    }
  }

  @Post()
  @ApiOperation({
    summary: 'Crear un libro',
    description: 'Crea un libro',
  })
  @ApiResponse({
    status: 201,
    description: 'Libro creado',
    type: MiLibro,
  })
  async crearMiLibro(@Body() miLibro: CrearMiLibroDto) {
    try {
      return await this.misLibrosService.crearMiLibro(miLibro);
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
  @ApiOperation({
    summary: 'Actualizar un libro',
    description: 'Actualiza un libro',
  })
  @ApiResponse({
    status: 200,
    description: 'Libro actualizado',
    type: MiLibro,
  })
  async actualizarMiLibro(
    @Param('id') id: string,
    @Body() miLibro: ActualizarMiLibroDto,
  ) {
    try {
      return await this.misLibrosService.actualizarMiLibro(+id, miLibro);
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
  @ApiOperation({
    summary: 'Eliminar un libro',
    description: 'Elimina un libro',
  })
  @ApiResponse({
    status: 200,
    description: 'Libro eliminado',
    type: MiLibro,
  })
  async eliminarMiLibro(@Param('id') id: string) {
    try {
      return await this.misLibrosService.eliminarMiLibro(+id);
    } catch (error) {
      console.error(error.message);
      throw new NotFoundException('Libro no encontrado');
    }
  }
}
