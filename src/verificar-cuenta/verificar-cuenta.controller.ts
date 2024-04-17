import {
  BadRequestException,
  Controller,
  Get,
  NotFoundException,
  Query,
  UnauthorizedException,
} from '@nestjs/common';
import { JsonWebTokenError, TokenExpiredError } from '@nestjs/jwt';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { Public } from '../public.decorator';
import { UsuariosService } from '../usuarios/usuarios.service';
import { VerificarCuentaService } from './verificar-cuenta.service';

@ApiTags('verificar-cuenta')
@Controller('verificar-cuenta')
export class VerificarCuentaController {
  constructor(
    private readonly verificarCuentaService: VerificarCuentaService,
    private readonly usuariosService: UsuariosService,
  ) {}

  @Public()
  @ApiTags('publico')
  @Get()
  @ApiOperation({
    summary: 'Verificar cuenta',
    description: 'Verificar cuenta',
  })
  @ApiOkResponse({
    description: 'Cuenta verificada',
    schema: {
      title: 'Cuenta verificada',
      description: 'Cuenta verificada',
      example: {
        verified: true,
        message:
          'Muchas gracias por verificar tu cuenta. Ahora puedes iniciar sesión.',
      },
    },
  })
  async verificarCuenta(@Query('token') token: string) {
    try {
      const { email } = this.verificarCuentaService.validarToken(token);
      const usuario = await this.usuariosService.obtenerUsuarioPorEmail(email);

      if (usuario.verificado) {
        return {
          verified: true,
          message: 'Tu cuenta ya ha sido verificada anteriormente.',
        };
      }

      // Verify the account
      await this.usuariosService.verificarUsuario(email);

      return {
        verified: true,
        message:
          'Muchas gracias por verificar tu cuenta. Ahora puedes iniciar sesión.',
      };
    } catch (error) {
      console.error(error.message);

      if (error instanceof TokenExpiredError) {
        throw new UnauthorizedException(
          'Tu solicitud ha expirado. Por favor, solicita un nuevo email de verificación de cuenta',
        );
      } else if (error instanceof JsonWebTokenError) {
        throw new BadRequestException(
          'Tu solicitud no es válida. Por favor, solicita un nuevo email de verificación de cuenta',
        );
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
