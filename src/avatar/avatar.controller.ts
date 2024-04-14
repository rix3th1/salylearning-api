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
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { AvatarService } from './avatar.service';
import { ActualizarAvatarDto, CrearAvatarDto } from './dto/avatar.dto';
import { Avatar } from './entities/avatar.entity';
import { match } from 'assert';

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

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener un avatar por ID',
    description: 'Obtiene un avatar por su ID.',
  })
  @ApiOkResponse({
    description: 'Avatar encontrado',
    type: Avatar,
  })
  async obtenerAvatar(@Param('id') id: string) {
    try {
      return await this.avatarService.obtenerAvatar(+id);
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
  @ApiOkResponse({
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
    @Param('id') id: string,
    @Body() avatar: ActualizarAvatarDto,
  ) {
    try {
      return await this.avatarService.actualizarAvatar(+id, avatar);
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
  async eliminarAvatar(@Param('id') id: string) {
    try {
      return await this.avatarService.eliminarAvatar(+id);
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
