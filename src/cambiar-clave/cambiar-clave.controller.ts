import {
  BadGatewayException,
  BadRequestException,
  Body,
  Controller,
  NotFoundException,
  Param,
  Patch,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import * as argon2 from 'argon2';
import { UsuariosService } from '../usuarios/usuarios.service';
import { CambiarClaveService } from './cambiar-clave.service';
import { CambiarClaveDto } from './dto/cambiar-clave.dto';

@ApiBearerAuth('access-token')
@ApiTags('cambiar-clave')
@Controller('cambiar-clave')
export class CambiarClaveController {
  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly cambiarClaveService: CambiarClaveService,
  ) {}

  @Patch(':email')
  @ApiOperation({
    summary: 'Cambiar clave',
    description: 'Cambiar clave',
  })
  @ApiOkResponse({
    description: 'Clave cambiada exitosamente',
    schema: {
      title: 'Clave cambiada',
      description: 'Clave cambiada',
      example: {
        message: `Se ha cambiado la clave del usuario asociado al email. Por favor, inicia sesión con tu nueva clave.`,
      },
    },
  })
  async cambiarClave(
    @Param('email') email: string,
    @Body() cambiarClave: CambiarClaveDto,
  ) {
    try {
      const { p_nombre, p_apellido, password, rol, username } =
        await this.usuariosService.obtenerUsuarioPorEmail(email);

      const notPasswordChanges = await argon2.verify(
        password,
        cambiarClave.password,
      );

      if (notPasswordChanges) {
        throw new BadRequestException(
          'La nueva clave no puede ser igual a la clave actual.',
        );
      }

      const hash = await argon2.hash(cambiarClave.password);
      cambiarClave.password = hash;

      await this.cambiarClaveService.cambiarClave(email, cambiarClave.password);

      const response =
        await this.cambiarClaveService.enviarEmailDeAvisoDeCambioDeClave(email);

      if (response.error) {
        throw new BadGatewayException(
          `Error al enviar el email de aviso de cambio de clave a "${email}". Por favor, intenta de nuevo más tarde.`,
        );
      }

      return {
        message: `Se ha cambiado la clave del ${rol} "${p_nombre} ${p_apellido}" asociada al email ${email} con nombre de usuario ${username}. Por favor, inicia sesión con tu nueva clave.`,
      };
    } catch (error) {
      console.error(error.message);

      if (error instanceof BadGatewayException) {
        throw error;
      } else if (error instanceof BadRequestException) {
        throw error;
      } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(
            'No existe una cuenta asociada a este email. Por favor, solicita un nuevo email de recuperación de clave.',
          );
        }
      }
    }
  }
}
