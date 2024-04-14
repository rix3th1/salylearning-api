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
import { fotoPerfilValidators } from '../fileValidators';
import {
  ActualizarFotoPerfilDto,
  CrearFotoPerfilDto,
} from './dto/foto-perfil.dto';
import { FotoPerfil } from './entities/foto-perfil.entity';
import { FotoPerfilService } from './foto-perfil.service';

@ApiBearerAuth('access-token')
@ApiTags('foto-perfil')
@Controller('foto-perfil')
export class FotoPerfilController {
  constructor(private readonly fotoPerfilService: FotoPerfilService) {}

  @Get()
  @ApiOperation({
    summary: 'Obtener todas las fotos de perfil',
    description: 'Obtiene todas las fotos de perfil existentes.',
  })
  @ApiOkResponse({
    description: 'Fotos de perfil encontradas',
    type: [FotoPerfil],
  })
  async obtenerFotosPerfil() {
    return await this.fotoPerfilService.obtenerFotosPerfil();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener una foto de perfil por su ID',
    description: 'Obtiene una foto de perfil por su ID.',
  })
  @ApiOkResponse({
    description: 'Foto de perfil encontrada',
    type: FotoPerfil,
  })
  async obtenerFotoPerfil(@Param('id') id: string) {
    try {
      return await this.fotoPerfilService.obtenerFotoPerfil(+id);
    } catch (error) {
      console.error(error.message);

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(
            'No se encontró la foto de perfil con el ID proporcionado',
          );
        }
      }
    }
  }

  @Post()
  @UseInterceptors(FileInterceptor('foto'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({
    summary: 'Crear una foto de perfil',
    description: 'Crea una foto de perfil nueva.',
  })
  @ApiCreatedResponse({
    description: 'Foto de perfil creada',
    type: FotoPerfil,
  })
  async crearFotoPerfil(
    @Body() fotoPerfil: CrearFotoPerfilDto,
    @UploadedFile(fotoPerfilValidators(true)) foto: Express.Multer.File,
  ) {
    let public_id = '';

    try {
      const resCloudinary =
        await this.fotoPerfilService.subirFotoCloudinary(foto);

      if (!resCloudinary) {
        throw new InternalServerErrorException(
          'Error al subir la imagen de perfil',
        );
      }

      const { secure_url: foto_url, public_id: cloudinaryPublicId } =
        resCloudinary;

      public_id = cloudinaryPublicId;
      fotoPerfil.foto = foto_url;

      return await this.fotoPerfilService.crearFotoPerfil(fotoPerfil);
    } catch (error) {
      console.error(error.message);

      if (foto && public_id) {
        await this.fotoPerfilService.eliminarFotoCloudinary(public_id);
      }

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new BadRequestException(
            'Ya existe una foto de perfil con el mismo usuario o foto de perfil',
          );
        } else if (error.code === 'P2003') {
          throw new BadRequestException(
            'No se pudo crear la foto de perfil porque el id de usuario proporcionado no existe',
          );
        }
      }

      throw new InternalServerErrorException(
        'Error al intentar crear la foto de perfil',
      );
    }
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('foto'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({
    summary: 'Actualizar una foto de perfil',
    description: 'Actualiza una foto de perfil existente.',
  })
  @ApiOkResponse({
    description: 'Foto de perfil actualizada',
    type: FotoPerfil,
  })
  async actualizarFotoPerfil(
    @Param('id') id: string,
    @Body() fotoPerfil: ActualizarFotoPerfilDto,
    @UploadedFile(fotoPerfilValidators(false)) foto: Express.Multer.File,
  ) {
    let public_id = '';

    try {
      if (foto) {
        const resCloudinary =
          await this.fotoPerfilService.subirFotoCloudinary(foto);

        if (!resCloudinary) {
          throw new InternalServerErrorException(
            'Error al subir la imagen de perfil',
          );
        }

        const { secure_url: foto_url, public_id: cloudinaryPublicId } =
          resCloudinary;

        public_id = cloudinaryPublicId;
        fotoPerfil.foto = foto_url;

        const fotoPerfilAnterior =
          await this.fotoPerfilService.obtenerFotoPerfil(+id);

        const public_id_anterior = fotoPerfilAnterior.foto
          .split('/')
          .pop()
          .split('.')[0];

        if (public_id_anterior) {
          await this.fotoPerfilService.eliminarFotoCloudinary(
            public_id_anterior,
          );
        }
      }

      return await this.fotoPerfilService.actualizarFotoPerfil(+id, fotoPerfil);
    } catch (error) {
      console.error(error.message);

      if (foto && public_id) {
        await this.fotoPerfilService.eliminarFotoCloudinary(public_id);
      }

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new BadRequestException(
            'Ya existe una foto de perfil con el mismo usuario o foto de perfil',
          );
        } else if (error.code === 'P2003') {
          throw new BadRequestException(
            'No se pudo actualizar la foto de perfil porque el id de usuario proporcionado no existe',
          );
        } else if (error.code === 'P2025') {
          throw new NotFoundException(
            'No se encontró la foto de perfil con el ID proporcionado',
          );
        }
      }
    }
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar una foto de perfil',
    description: 'Elimina una foto de perfil existente.',
  })
  @ApiOkResponse({
    description: 'Foto de perfil eliminada',
    type: FotoPerfil,
  })
  async eliminarFotoPerfil(@Param('id') id: string) {
    try {
      return await this.fotoPerfilService.eliminarFotoPerfil(+id);
    } catch (error) {
      console.error(error.message);

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(
            'No se encontró la foto de perfil con el ID proporcionado',
          );
        }
      }
    }
  }
}
