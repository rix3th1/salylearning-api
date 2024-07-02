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
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Prisma, Rol } from '@prisma/client';
import { isIn } from 'class-validator';
import { AvatarService } from './avatar.service';
import { ActualizarAvatarDto, CrearAvatarDto } from './dto/avatar.dto';
import { Avatar } from './entities/avatar.entity';

@ApiTags('avatar')
@ApiBearerAuth('access-token')
@Controller('avatar')
export class AvatarController {
  constructor(private readonly avatarService: AvatarService) {}

  @Get()
  @ApiOperation({
    summary: 'Obtener todos los avatares',
    description: 'Obtiene todos los avatares existentes.',
  })
  @ApiOkResponse({
    description: 'Lista de avatares',
    type: [Avatar],
  })
  async obtenerAvatares() {
    return await this.avatarService.obtenerAvatares();
  }

  @Get('rol')
  @ApiOperation({
    summary: `Obtener avatares por rol: ${Object.values(Rol).join(', ')}`,
    description: 'Obtiene los avatares por rol.',
  })
  @ApiOkResponse({
    description: 'Lista de avatares',
    type: [Avatar],
  })
  async obtenerAvataresPorRol(@Query('rol') rol: Rol) {
    const rolAvatar = rol.toUpperCase() as Rol;

    try {
      if (!isIn(rolAvatar, Object.values(Rol))) {
        throw new BadRequestException('Rol de avatar inválido');
      }

      return await this.avatarService.obtenerAvataresPorRol(rolAvatar);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }

      throw new BadRequestException('Rol de avatar inválido');
    }
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener un avatar por ID',
    description: 'Obtiene un avatar por su ID.',
  })
  @ApiOkResponse({
    description: 'Avatar encontrado',
    type: Avatar,
  })
  async obtenerAvatar(@Param('id') id: number) {
    try {
      return await this.avatarService.obtenerAvatar(id);
    } catch (error) {
      console.error(error.message);

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException('No se encontró el avatar solicitado');
        }
      }
    }
  }

  @Post()
  @ApiOperation({
    summary: 'Crear un nuevo avatar',
    description: 'Crea un nuevo avatar.',
  })
  @ApiCreatedResponse({
    status: 201,
    description: 'Avatar creado',
    type: Avatar,
  })
  async crearAvatar(@Body() avatar: CrearAvatarDto) {
    try {
      return await this.avatarService.crearAvatar(avatar);
    } catch (error) {
      console.error(error.message);

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new BadRequestException(
            'Ya existe un avatar con el mismo nombre',
          );
        }
      }

      throw new InternalServerErrorException('Error al crear el avatar');
    }
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Actualizar un avatar',
    description: 'Actualiza un avatar existente.',
  })
  @ApiOkResponse({
    description: 'Avatar actualizado',
    type: Avatar,
  })
  async actualizarAvatar(
    @Param('id') id: number,
    @Body() avatar: ActualizarAvatarDto,
  ) {
    try {
      return await this.avatarService.actualizarAvatar(id, avatar);
    } catch (error) {
      console.error(error.message);

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new BadRequestException(
            'Ya existe un avatar con el mismo nombre',
          );
        } else if (error.code === 'P2025') {
          throw new NotFoundException('No se encontró el avatar solicitado');
        }
      }
    }
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar un avatar',
    description: 'Elimina un avatar existente.',
  })
  @ApiOkResponse({
    description: 'Avatar eliminado',
    type: Avatar,
  })
  async eliminarAvatar(@Param('id') id: number) {
    try {
      return await this.avatarService.eliminarAvatar(id);
    } catch (error) {
      console.error(error.message);

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException('No se encontró el avatar solicitado');
        }
      }
    }
  }
}
