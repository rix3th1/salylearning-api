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
import {
  ActualizarGradoUsuarioDto,
  CrearGradoUsuarioDto,
} from './dto/grado-usuario.dto';
import { GradoUsuario } from './entities/grado-usuario.entity';
import { GradoUsuarioService } from './grado-usuario.service';

@ApiBearerAuth('access-token')
@ApiTags('grado-usuario')
@Controller('grado-usuario')
export class GradoUsuarioController {
  constructor(private readonly gradoUsuarioService: GradoUsuarioService) {}

  @Get()
  @ApiOperation({
    summary: 'Obtener todos los grados de usuarios',
    description: 'Obtiene todos los grados de usuarios existentes.',
  })
  @ApiOkResponse({
    description: 'Grados de usuarios encontrados',
    type: [GradoUsuario],
  })
  async obtenerGradosUsuario() {
    return await this.gradoUsuarioService.obtenerGradosUsuario();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener un grado de usuario por su ID',
    description: 'Obtiene un grado de usuario por su ID.',
  })
  @ApiOkResponse({
    description: 'Grado de usuario encontrado',
    type: GradoUsuario,
  })
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
  @ApiOperation({
    summary: 'Crear un grado de usuario',
    description: 'Crea un grado de usuario.',
  })
  @ApiCreatedResponse({
    description: 'Grado de usuario creado',
    type: GradoUsuario,
  })
  async crearGradoUsuario(@Body() gradoUsuario: CrearGradoUsuarioDto) {
    try {
      return await this.gradoUsuarioService.crearGradoUsuario(gradoUsuario);
    } catch (error) {
      console.error(error.message);

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new BadRequestException(
            'Ya existe un grado del usuario con el mismo usuario o id de grado',
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
  @ApiOperation({
    summary: 'Actualizar un grado de usuario',
    description: 'Actualiza un grado de usuario.',
  })
  @ApiOkResponse({
    description: 'Grado de usuario actualizado',
    type: GradoUsuario,
  })
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
            'Ya existe un grado del usuario con el mismo usuario o id de grado',
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
  @ApiOperation({
    summary: 'Eliminar un grado de usuario',
    description: 'Elimina un grado de usuario.',
  })
  @ApiOkResponse({
    description: 'Grado de usuario eliminado',
    type: GradoUsuario,
  })
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
