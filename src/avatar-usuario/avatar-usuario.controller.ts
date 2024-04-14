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
import { AvatarUsuarioService } from './avatar-usuario.service';
import {
  ActualizarAvatarUsuarioDto,
  CrearAvatarUsuarioDto,
} from './dto/avatar-usuario.dto';
import { AvatarUsuario } from './entities/avatar-usuario.entity';

@ApiBearerAuth('access-token')
@ApiTags('avatar-usuario')
@Controller('avatar-usuario')
export class AvatarUsuarioController {
  constructor(private readonly avatarUsuarioService: AvatarUsuarioService) {}

  @Get()
  @ApiOperation({
    summary: 'Obtener todos los avatares de usuarios',
    description: 'Obtiene todos los avatares de usuarios existentes.',
  })
  @ApiOkResponse({
    description: 'Avatares de usuarios encontrados',
    type: [AvatarUsuario],
  })
  async obtenerAvataresUsuario() {
    return await this.avatarUsuarioService.obtenerAvataresUsuario();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener un avatar de usuario por su ID',
    description: 'Obtiene un avatar de usuario por su ID.',
  })
  @ApiOkResponse({
    description: 'Avatar de usuario encontrado',
    type: AvatarUsuario,
  })
  async obtenerAvatarUsuario(@Param('id') id: string) {
    try {
      return await this.avatarUsuarioService.obtenerAvatarUsuario(+id);
    } catch (error) {
      console.error(error.message);

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(
            'No se encontró el avatar de usuario solicitado',
          );
        }
      }
    }
  }

  @Post()
  @ApiOperation({
    summary: 'Crear un avatar de usuario',
    description: 'Crea un avatar de usuario.',
  })
  @ApiCreatedResponse({
    description: 'Avatar de usuario creado',
    type: AvatarUsuario,
  })
  async crearAvatarUsuario(@Body() avatarUsuario: CrearAvatarUsuarioDto) {
    try {
      return await this.avatarUsuarioService.crearAvatarUsuario(avatarUsuario);
    } catch (error) {
      console.error(error.message);

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new BadRequestException(
            'Ya existe un avatar del usuario con el mismo usuario o id de avatar',
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
  @ApiOperation({
    summary: 'Actualizar un avatar de usuario',
    description: 'Actualiza un avatar de usuario.',
  })
  @ApiOkResponse({
    description: 'Avatar de usuario actualizado',
    type: AvatarUsuario,
  })
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
            'Ya existe un avatar del usuario con el mismo usuario o id de avatar',
          );
        } else if (error.code === 'P2003') {
          throw new BadRequestException(
            'El id de avatar del usuario o el id de usuario no existe',
          );
        } else if (error.code === 'P2025') {
          throw new NotFoundException(
            'No se encontró el avatar del usuario solicitado',
          );
        }
      }
    }
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar un avatar de usuario',
    description: 'Eliminar un avatar de usuario.',
  })
  @ApiOkResponse({
    description: 'Avatar de usuario eliminado',
    type: AvatarUsuario,
  })
  async eliminarAvatarUsuario(@Param('id') id: string) {
    try {
      return await this.avatarUsuarioService.eliminarAvatarUsuario(+id);
    } catch (error) {
      console.error(error.message);

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(
            'No se encontró el avatar del usuario solicitado',
          );
        }
      }
    }
  }
}
