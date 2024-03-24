import { GradoUsuarioService } from './grado-usuario.service';
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
  ActualizarGradoUsuarioDto,
  CrearGradoUsuarioDto,
} from './dto/grado-usuario.dto';
import { Prisma } from '@prisma/client';

@Controller('grado-usuario')
export class GradoUsuarioController {
  constructor(private readonly gradoUsuarioService: GradoUsuarioService) {}

  @Get()
  async obtenerGradosUsuario() {
    return await this.gradoUsuarioService.obtenerGradosUsuario();
  }

  @Get(':id')
  async obtenerGradoUsuario(@Param('id') id: string) {
    try {
      return await this.gradoUsuarioService.obtenerGradoUsuario(+id);
    } catch (error) {
      console.error(error.message);
      throw new NotFoundException(
        'No se encontró el grado del usuario solicitado',
      );
    }
  }

  @Post()
  async crearGradoUsuario(@Body() gradoUsuario: CrearGradoUsuarioDto) {
    try {
      return await this.gradoUsuarioService.crearGradoUsuario(gradoUsuario);
    } catch (error) {
      console.error(error.message);

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new BadRequestException(
            'Ya existe un grado del usuario con el mismo usuario',
          );
        } else if (error.code === 'P2003') {
          throw new BadRequestException(
            'El id de grado del usuario o el id de usuario no existe',
          );
        }
      }

      throw new InternalServerErrorException(
        'Error al crear el grado del usuario',
      );
    }
  }

  @Patch(':id')
  async actualizarGradoUsuario(
    @Param('id') id: string,
    @Body() gradoUsuario: ActualizarGradoUsuarioDto,
  ) {
    try {
      return await this.gradoUsuarioService.actualizarGradoUsuario(
        +id,
        gradoUsuario,
      );
    } catch (error) {
      console.error(error.message);

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new BadRequestException(
            'Ya existe un grado del usuario con el mismo usuario',
          );
        } else if (error.code === 'P2003') {
          throw new BadRequestException(
            'El id de grado del usuario o el id de usuario no existe',
          );
        }
      }

      throw new NotFoundException(
        'No se encontró el grado del usuario solicitado',
      );
    }
  }

  @Delete(':id')
  async eliminarGradoUsuario(@Param('id') id: string) {
    try {
      return await this.gradoUsuarioService.eliminarGradoUsuario(+id);
    } catch (error) {
      console.error(error.message);
      throw new NotFoundException(
        'No se encontró el grado del usuario solicitado',
      );
    }
  }
}
