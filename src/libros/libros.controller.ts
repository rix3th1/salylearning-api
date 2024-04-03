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
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { fileValidators } from 'src/fileValidators';
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

  @Get('buscar')
  @ApiOperation({
    summary: 'Buscar libros por nombre',
    description: 'Buscar libros por nombre',
  })
  @ApiOkResponse({
    description: 'Lista de libros encontrados',
    type: [Libro],
  })
  async obtenerLibroPorNombre(@Query('nom_libro') nom_libro: string) {
    return await this.librosService.obtenerLibrosPorNombre(nom_libro);
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
  @UseInterceptors(FileInterceptor('imagen_portada'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({
    summary: 'Crear un libro',
    description: 'Crear un libro',
  })
  @ApiCreatedResponse({
    description: 'Libro creado',
    type: Libro,
  })
  async crearLibro(
    @Body() libro: CrearLibroDto,
    @UploadedFile(fileValidators)
    imagen_portada: Express.Multer.File,
  ) {
    let public_id: string;

    try {
      const { secure_url: imagen_portada_url, public_id: cloudinaryPublicId } =
        await this.librosService.subirPortadaLibro(imagen_portada);

      public_id = cloudinaryPublicId;
      libro.imagen_portada = imagen_portada_url;

      return await this.librosService.crearLibro(libro);
    } catch (error) {
      console.error(error.message);

      if (imagen_portada) {
        await this.librosService.eliminarPortadaLibro(public_id);
      }

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new BadRequestException(
            'El nombre, la portada o la url del libro ya existe',
          );
        } else if (error.code === 'P2003') {
          throw new BadRequestException('El id de grado del libro no existe');
        }
      }

      throw new InternalServerErrorException('Error al crear el libro');
    }
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('imagen_portada'))
  @ApiConsumes('multipart/form-data')
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
    @UploadedFile(fileValidators) imagen_portada: Express.Multer.File,
  ) {
    let public_id: string;

    try {
      if (imagen_portada) {
        const {
          secure_url: imagen_portada_url,
          public_id: cloudinaryPublicId,
        } = await this.librosService.subirPortadaLibro(imagen_portada);

        public_id = cloudinaryPublicId;
        libro.imagen_portada = imagen_portada_url;

        const libroAnterior = await this.librosService.obtenerLibroPorId(+id);
        if (libroAnterior.imagen_portada) {
          const public_id_anterior = libroAnterior.imagen_portada
            .split('/')
            .pop()
            .split('.')[0];
          await this.librosService.eliminarPortadaLibro(public_id_anterior);
        }
      }

      return await this.librosService.actualizarLibro(+id, libro);
    } catch (error) {
      console.error(error.message);

      if (imagen_portada) {
        await this.librosService.eliminarPortadaLibro(public_id);
      }

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new BadRequestException(
            'El nombre, la portada o la url del libro ya existe',
          );
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
