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
import { ApiTags } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { AvatarUsuarioService } from './avatar-usuario.service';
import {
  ActualizarAvatarUsuarioDto,
  CrearAvatarUsuarioDto,
} from './dto/avatar-usuario.dto';

@ApiTags('avatar-usuario')
@Controller('avatar-usuario')
export class AvatarUsuarioController {
  constructor(private readonly avatarUsuarioService: AvatarUsuarioService) {}

  @Get()
  async obtenerAvataresUsuario() {
    return await this.avatarUsuarioService.obtenerAvataresUsuario();
  }

  @Get(':id')
  async obtenerAvatarUsuario(@Param('id') id: string) {
    try {
      return await this.avatarUsuarioService.obtenerAvatarUsuario(+id);
    } catch (error) {
      console.error(error.message);
      throw new NotFoundException(
        'No se encontró el avatar del usuario solicitado',
      );
    }
  }

  @Post()
  async crearAvatarUsuario(@Body() avatarUsuario: CrearAvatarUsuarioDto) {
    try {
      return await this.avatarUsuarioService.crearAvatarUsuario(avatarUsuario);
    } catch (error) {
      console.error(error.message);

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new BadRequestException(
            'Ya existe un avatar del usuario con el mismo usuario',
          );
        } else if (error.code === 'P2003') {
          throw new BadRequestException(
            'El id de avatar del usuario o el id de usuario no existe',
          );
        }
      }

      throw new InternalServerErrorException(
        'Error al crear el avatar del usuario',
      );
    }
  }

  @Patch(':id')
  async actualizarAvatarUsuario(
    @Param('id') id: string,
    @Body() avatarUsuario: ActualizarAvatarUsuarioDto,
  ) {
    try {
      return await this.avatarUsuarioService.actualizarAvatarUsuario(
        +id,
        avatarUsuario,
      );
    } catch (error) {
      console.error(error.message);

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new BadRequestException(
            'Ya existe un avatar del usuario con el mismo usuario',
          );
        } else if (error.code === 'P2003') {
          throw new BadRequestException(
            'El id de avatar del usuario o el id de usuario no existe',
          );
        }
      }

      throw new NotFoundException(
        'No se encontró el avatar del usuario solicitado',
      );
    }
  }

  @Delete(':id')
  async eliminarAvatarUsuario(@Param('id') id: string) {
    try {
      return await this.avatarUsuarioService.eliminarAvatarUsuario(+id);
    } catch (error) {
      console.error(error.message);
      throw new NotFoundException(
        'No se encontró el avatar del usuario solicitado',
      );
    }
  }
}
