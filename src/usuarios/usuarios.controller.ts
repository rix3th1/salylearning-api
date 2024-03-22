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
import { ActualizarUsuarioDto, CrearUsuarioDto } from './dto/usuarios.dto';
import { UsuariosService } from './usuarios.service';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Get()
  async obtenerUsuarios() {
    return await this.usuariosService.obtenerUsuarios();
  }

  @Get(':id')
  async obtenerUsuarioPorId(@Param('id') id: string) {
    try {
      return await this.usuariosService.obtenerUsuarioPorId(+id);
    } catch (error) {
      console.error({ error });
      throw new NotFoundException('Usuario no encontrado');
    }
  }

  @Post()
  async crearUsuario(@Body() usuario: CrearUsuarioDto) {
    try {
      return await this.usuariosService.crearUsuario(usuario);
    } catch (error) {
      console.log({ error });

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new BadRequestException(
            'El email o el nombre de usuario ya existen',
          );
        }
      }

      throw new InternalServerErrorException('Error al crear usuario');
    }
  }

  @Patch(':id')
  async actualizarUsuario(
    @Param('id') id: string,
    @Body() usuario: ActualizarUsuarioDto,
  ) {
    try {
      return await this.usuariosService.actualizarUsuario(+id, usuario);
    } catch (error) {
      console.error({ error });

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new BadRequestException(
            'El email o el nombre de usuario ya existen',
          );
        }
      }
      throw new NotFoundException('Usuario no encontrado');
    }
  }

  @Delete(':id')
  async eliminarUsuario(@Param('id') id: string) {
    try {
      return await this.usuariosService.eliminarUsuario(+id);
    } catch (error) {
      throw new NotFoundException('Usuario no encontrado');
    }
  }
}
