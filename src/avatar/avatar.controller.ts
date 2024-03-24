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
import { Prisma } from '@prisma/client';
import { AvatarService } from './avatar.service';
import { ActualizarAvatarDto, CrearAvatarDto } from './dto/avatar.dto';

@Controller('avatar')
export class AvatarController {
  constructor(private readonly avatarService: AvatarService) {}

  @Get()
  async obtenerAvatares() {
    return await this.avatarService.obtenerAvatares();
  }

  @Get(':id')
  async obtenerAvatar(@Param('id') id: string) {
    try {
      return await this.avatarService.obtenerAvatar(+id);
    } catch (error) {
      console.error(error.message);
      throw new NotFoundException('No se encontró el avatar solicitado');
    }
  }

  @Post()
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
        }
      }

      throw new NotFoundException('No se encontró el avatar solicitado');
    }
  }

  @Delete(':id')
  async eliminarAvatar(@Param('id') id: string) {
    try {
      return await this.avatarService.eliminarAvatar(+id);
    } catch (error) {
      console.error(error.message);
      throw new NotFoundException('No se encontró el avatar solicitado');
    }
  }
}
