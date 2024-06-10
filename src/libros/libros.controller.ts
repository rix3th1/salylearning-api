import {
  BadGatewayException,
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
import { portadaImgValidators } from '../fileValidators';
import { ActualizarLibroDto, CrearLibroDto } from './dto/libros.dto';
import { Libro } from './entities/libro.entity';
import { LibrosService } from './libros.service';

@ApiBearerAuth('access-token')
@ApiTags('libros')
@Controller('libros')
export class LibrosController {
  constructor(private readonly librosService: LibrosService) {}

  @Get('contar')
  @ApiOperation({
    summary: 'Contar todos los libros que existen en la base de datos',
    description: 'Devuelve el número de libros',
  })
  @ApiOkResponse({
    description: 'Número de libros',
    type: Number,
  })
  async contarLibros() {
    return await this.librosService.contarLibros();
  }

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

  @Get('populares')
  @ApiOperation({
    summary: 'Obtener los libros más populares',
    description: 'Obtener los libros más populares',
  })
  @ApiOkResponse({
    description: 'Lista de libros populares',
    type: [Libro],
  })
  async obtenerLibrosPopulares() {
    return await this.librosService.obtenerLibrosPopulares();
  }

  @Get('nombre')
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

  @Get('autor')
  @ApiOperation({
    summary: 'Buscar libros por autor',
    description: 'Buscar libros por autor',
  })
  @ApiOkResponse({
    description: 'Lista de libros encontrados',
    type: [Libro],
  })
  async obtenerLibroPorAutor(@Query('autor') autor: string) {
    return await this.librosService.obtenerLibrosPorAutor(autor);
  }

  @Get('editorial')
  @ApiOperation({
    summary: 'Buscar libros por editorial',
    description: 'Buscar libros por editorial',
  })
  @ApiOkResponse({
    description: 'Lista de libros encontrados',
    type: [Libro],
  })
  async obtenerLibroPorEditorial(@Query('editorial') editorial: string) {
    return await this.librosService.obtenerLibrosPorEditorial(editorial);
  }

  @Get('genero')
  @ApiOperation({
    summary: 'Buscar libros por género literario',
    description: 'Buscar libros por género literario',
  })
  @ApiOkResponse({
    description: 'Lista de libros encontrados',
    type: [Libro],
  })
  async obtenerLibrosPorGeneroLiterario(
    @Query('genero_literario') genero_literario: string,
  ) {
    return await this.librosService.obtenerLibrosPorGeneroLiterario(
      genero_literario,
    );
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
  async obtenerLibro(@Param('id') id: string) {
    try {
      return await this.librosService.obtenerLibro(+id);
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
    @UploadedFile(portadaImgValidators(true))
    imagen_portada: Express.Multer.File,
  ) {
    let public_id = '';

    try {
      const resCloudinary =
        await this.librosService.subirPortadaLibroCloudinary(imagen_portada);

      if (!resCloudinary) {
        throw new BadGatewayException('Error al subir la imagen de portada');
      }

      const { secure_url: imagen_portada_url, public_id: cloudinaryPublicId } =
        resCloudinary;

      public_id = cloudinaryPublicId;
      libro.imagen_portada = imagen_portada_url;

      return await this.librosService.crearLibro(libro);
    } catch (error) {
      console.error(error.message);

      if (imagen_portada && public_id) {
        await this.librosService.eliminarPortadaLibroCloudinary(public_id);
      }

      if (error instanceof BadGatewayException) {
        throw error;
      } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new BadRequestException(
            'El nombre, la portada o la url del libro ya existe',
          );
        } else if (error.code === 'P2003') {
          throw new BadRequestException(
            'El id de grado o el id de género literario del libro no existe',
          );
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
    @UploadedFile(portadaImgValidators(false))
    imagen_portada: Express.Multer.File,
  ) {
    let public_id = '';

    try {
      if (imagen_portada) {
        const resCloudinary =
          await this.librosService.subirPortadaLibroCloudinary(imagen_portada);

        if (!resCloudinary) {
          throw new BadGatewayException('Error al subir la imagen de portada');
        }

        const {
          secure_url: imagen_portada_url,
          public_id: cloudinaryPublicId,
        } = resCloudinary;

        public_id = cloudinaryPublicId;
        libro.imagen_portada = imagen_portada_url;

        const libroAnterior = await this.librosService.obtenerLibro(+id);

        const public_id_anterior = libroAnterior.imagen_portada
          ?.split('/')
          ?.pop()
          ?.split('.')[0];

        if (public_id_anterior) {
          await this.librosService.eliminarPortadaLibroCloudinary(
            public_id_anterior,
          );
        }
      }

      return await this.librosService.actualizarLibro(+id, libro);
    } catch (error) {
      console.error(error.message);

      if (imagen_portada && public_id) {
        await this.librosService.eliminarPortadaLibroCloudinary(public_id);
      }

      if (error instanceof BadGatewayException) {
        throw error;
      } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new BadRequestException(
            'El nombre, la portada o la url del libro ya existe',
          );
        } else if (error.code === 'P2003') {
          throw new BadRequestException(
            'El id de grado o el id de género literario del libro no existe',
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

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException('Libro no encontrado');
        }
      }
    }
  }
}
