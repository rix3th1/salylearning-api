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
import * as argon2 from 'argon2';
import { exclude } from '../libs';
import { ActualizarUsuarioDto, CrearUsuarioDto } from './dto/usuarios.dto';
import { Usuario, UsuarioRespuesta } from './entities/usuario.entity';
import { UsuariosService } from './usuarios.service';

@ApiTags('usuarios')
@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @ApiBearerAuth('access-token')
  @Get()
  @ApiOperation({
    summary: 'Obtener todos los usuarios',
    description: 'Obtiene todos los usuarios de la base de datos',
  })
  @ApiOkResponse({
    description: 'Lista de usuarios',
    type: [UsuarioRespuesta],
  })
  async obtenerUsuarios() {
    const usuarios = await this.usuariosService.obtenerUsuarios();
    return usuarios.map((usuario) =>
      exclude<Usuario, keyof Usuario>(usuario, 'password'),
    );
  }

  @ApiBearerAuth('access-token')
  @Get(':id')
  @ApiOperation({
    summary: 'Obtener un usuario por su ID',
    description: 'Obtiene un usuario de la base de datos por su ID',
  })
  @ApiOkResponse({
    description: 'Usuario encontrado',
    type: UsuarioRespuesta,
  })
  async obtenerUsuario(@Param('id') id: string) {
    try {
      const usuario = await this.usuariosService.obtenerUsuario(+id);
      // Delete the password from the user object
      delete usuario.password;
      return usuario;
    } catch (error) {
      console.error(error.message);

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException('Usuario no encontrado');
        }
      }
    }
  }

  @Post()
  @ApiOperation({
    summary: 'Crear un usuario',
    description: 'Crea un usuario en la base de datos',
  })
  @ApiCreatedResponse({
    description: 'Usuario creado',
    type: UsuarioRespuesta,
  })
  async crearUsuario(@Body() nuevoUsuario: CrearUsuarioDto) {
    try {
      const hash = await argon2.hash(nuevoUsuario.password);
      nuevoUsuario.password = hash;

      const usuario = await this.usuariosService.crearUsuario(nuevoUsuario);
      // Delete the password from the user object
      delete usuario.password;
      return usuario;
    } catch (error) {
      console.error(error.message);

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

  @ApiBearerAuth('access-token')
  @Patch(':id')
  @ApiOperation({
    summary: 'Actualizar un usuario',
    description: 'Actualiza un usuario en la base de datos',
  })
  @ApiOkResponse({
    description: 'Usuario actualizado',
    type: UsuarioRespuesta,
  })
  async actualizarUsuario(
    @Param('id') id: string,
    @Body() usuarioExistente: ActualizarUsuarioDto,
  ) {
    try {
      if (usuarioExistente.password) {
        const hash = await argon2.hash(usuarioExistente.password);
        usuarioExistente.password = hash;
      }

      const usuario = await this.usuariosService.actualizarUsuario(
        +id,
        usuarioExistente,
      );
      // Delete the password from the user object
      delete usuario.password;
      return usuario;
    } catch (error) {
      console.error(error.message);

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new BadRequestException(
            'El email o el nombre de usuario ya existen',
          );
        } else if (error.code === 'P2025') {
          throw new NotFoundException('Usuario no encontrado');
        }
      }
    }
  }

  @ApiBearerAuth('access-token')
  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar un usuario',
    description: 'Elimina un usuario de la base de datos',
  })
  @ApiOkResponse({
    description: 'Usuario eliminado',
    type: UsuarioRespuesta,
  })
  async eliminarUsuario(@Param('id') id: string) {
    try {
      const usuario = await this.usuariosService.eliminarUsuario(+id);
      // Delete the password from the user object
      delete usuario.password;
      return usuario;
    } catch (error) {
      console.error(error.message);

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException('Usuario no encontrado');
        }
      }
    }
  }
}
