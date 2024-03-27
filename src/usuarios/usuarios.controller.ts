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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import * as argon2 from 'argon2';
import { ActualizarUsuarioDto, CrearUsuarioDto } from './dto/usuarios.dto';
import Usuario from './entities/usuario.entity';
import { UsuariosService } from './usuarios.service';

@ApiTags('usuarios')
@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Get()
  @ApiOperation({
    summary: 'Obtener todos los usuarios',
    description: 'Obtiene todos los usuarios de la base de datos',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de usuarios',
    type: [Usuario],
  })
  async obtenerUsuarios() {
    return await this.usuariosService.obtenerUsuarios();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener un usuario por su ID',
    description: 'Obtiene un usuario de la base de datos por su ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Usuario encontrado',
    type: Usuario,
  })
  async obtenerUsuarioPorId(@Param('id') id: string) {
    try {
      const { password, ...result } =
        await this.usuariosService.obtenerUsuarioPorId(+id);
      return result;
    } catch (error) {
      console.error(error.message);
      throw new NotFoundException('Usuario no encontrado');
    }
  }

  @Post()
  @ApiOperation({
    summary: 'Crear un usuario',
    description: 'Crea un usuario en la base de datos',
  })
  @ApiResponse({
    status: 201,
    description: 'Usuario creado',
    type: Usuario,
  })
  async crearUsuario(@Body() usuario: CrearUsuarioDto) {
    try {
      const hash = await argon2.hash(usuario.password);
      usuario.password = hash;

      const { password, ...result } =
        await this.usuariosService.crearUsuario(usuario);
      return result;
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

  @Patch(':id')
  @ApiOperation({
    summary: 'Actualizar un usuario',
    description: 'Actualiza un usuario en la base de datos',
  })
  @ApiResponse({
    status: 200,
    description: 'Usuario actualizado',
    type: Usuario,
  })
  async actualizarUsuario(
    @Param('id') id: string,
    @Body() usuario: ActualizarUsuarioDto,
  ) {
    try {
      if (usuario.password) {
        const hash = await argon2.hash(usuario.password);
        usuario.password = hash;
      }

      const { password, ...result } =
        await this.usuariosService.actualizarUsuario(+id, usuario);
      return result;
    } catch (error) {
      console.error(error.message);

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
  @ApiOperation({
    summary: 'Eliminar un usuario',
    description: 'Elimina un usuario de la base de datos',
  })
  @ApiResponse({
    status: 200,
    description: 'Usuario eliminado',
    type: Usuario,
  })
  async eliminarUsuario(@Param('id') id: string) {
    try {
      const { password, ...result } =
        await this.usuariosService.eliminarUsuario(+id);
      return result;
    } catch (error) {
      console.error(error.message);
      throw new NotFoundException('Usuario no encontrado');
    }
  }
}
