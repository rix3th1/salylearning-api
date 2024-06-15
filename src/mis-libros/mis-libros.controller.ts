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
import { ActualizarMiLibroDto, CrearMiLibroDto } from './dto/mis-libros.dto';
import { MiLibro } from './entities/mi-libro.entity';
import { MisLibrosService } from './mis-libros.service';

@ApiBearerAuth('access-token')
@ApiTags('mis-libros')
@Controller('mis-libros')
export class MisLibrosController {
  constructor(private readonly misLibrosService: MisLibrosService) {}

  @Get('contar/usuario/:id')
  @ApiOperation({
    summary: 'Contar mis libros',
    description: 'Devuelve el número de libros del usuario',
  })
  @ApiOkResponse({
    description: 'Número de libros del usuario',
    type: Number,
  })
  async contarMisLibros(@Param('id') id: string) {
    return await this.misLibrosService.contarMisLibros(+id);
  }

  @Get()
  @ApiOperation({
    summary: 'Obtener todos los libros',
    description: 'Obtiene todos los libros del usuario',
  })
  @ApiOkResponse({
    description: 'Libros encontrados',
    type: [MiLibro],
  })
  async obtenerMisLibros() {
    return await this.misLibrosService.obtenerMisLibros();
  }

  @Get('/libro/:id')
  @ApiOperation({
    summary: 'Obtener un libro',
    description: 'Obtiene un libro del usuario',
  })
  @ApiOkResponse({
    description: 'Libro encontrado',
    type: MiLibro,
  })
  async obtenerMiLibroPorIdLibro(@Param('id') id: string) {
    try {
      const miLibro = await this.misLibrosService.obtenerMiLibroPorIdLibro(+id);
      return miLibro || false;
    } catch (error) {
      console.error(error.message);

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException('Libro no encontrado');
        }
      }
    }
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener un libro por su ID',
    description: 'Obtiene un libro por su ID',
  })
  @ApiOkResponse({
    description: 'Libro encontrado',
    type: MiLibro,
  })
  async obtenerMiLibro(@Param('id') id: string) {
    try {
      return await this.misLibrosService.obtenerMiLibro(+id);
    } catch (error) {
      console.error(error.message);

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException('Libro no encontrado');
        }
      }
    }
  }

  @Post()
  @ApiOperation({
    summary: 'Crear un libro',
    description: 'Crea un libro',
  })
  @ApiCreatedResponse({
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
  @ApiOkResponse({
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
        } else if (error.code === 'P2025') {
          throw new NotFoundException('Libro no encontrado');
        }
      }
    }
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar un libro',
    description: 'Elimina un libro',
  })
  @ApiOkResponse({
    description: 'Libro eliminado',
    type: MiLibro,
  })
  async eliminarMiLibro(@Param('id') id: string) {
    try {
      return await this.misLibrosService.eliminarMiLibro(+id);
    } catch (error) {
      console.error(error.message);

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException('Libro no encontrado');
        }
      }
    }
  }
}
