import {
  BadGatewayException,
  BadRequestException,
  Body,
  Controller,
  ForbiddenException,
  Get,
  Headers,
  NotFoundException,
  Patch,
  Post,
  Query,
  UnauthorizedException,
} from '@nestjs/common';
import { JsonWebTokenError, TokenExpiredError } from '@nestjs/jwt';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import * as argon2 from 'argon2';
import { Public } from '../public.decorator';
import { UsuariosService } from '../usuarios/usuarios.service';
import { CambiarClaveDto, RecuperarClaveDto } from './dto/recuperar-clave.dto';
import { RecuperarClaveService } from './recuperar-clave.service';

@ApiTags('recuperar-clave')
@Controller('recuperar-clave')
export class RecuperarClaveController {
  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly recuperarClaveService: RecuperarClaveService,
  ) {}

  @Public()
  @ApiTags('publico')
  @Post('enviar-email-de-recuperacion')
  @ApiOperation({
    summary: 'Enviar email de recuperación',
    description: 'Enviar email de recuperación',
  })
  @ApiOkResponse({
    description: 'Email enviado',
    schema: {
      title: 'Email enviado',
      description: 'Email enviado',
      example: {
        message: `Si existe una cuenta asociada a este email, se enviará un email con las instrucciones para recuperar la clave.`,
      },
    },
  })
  async enviarEmailDeRecuperacion(
    @Body() datosUsuario: RecuperarClaveDto,
    @Headers() headers,
  ) {
    try {
      // Check if the email exists in the DB
      const { email, password: oldPassword } =
        await this.usuariosService.obtenerUsuarioPorEmail(datosUsuario.email);

      // Generate a token for password recovery
      const tokenDeRecuperacion = this.recuperarClaveService.generarToken({
        email,
        oldPassword,
      });

      // Send the email with the recovery instructions
      const response =
        await this.recuperarClaveService.enviarEmailDeRecuperacion(
          headers.origin,
          tokenDeRecuperacion,
          email,
        );

      if (response.error) {
        throw new BadGatewayException(
          `No se pudo enviar el email de recuperación de clave a ${datosUsuario.email}. Por favor, intenta de nuevo más tarde.`,
        );
      }

      return {
        message: `Si existe una cuenta asociada a este email: ${datosUsuario.email}, se enviará un email con las instrucciones para recuperar la clave.`,
      };
    } catch (error) {
      console.error({ error });

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(
            `No existe una cuenta asociada a este email: ${datosUsuario.email}`,
          );
        }
      }
    }
  }

  @Public()
  @ApiTags('publico')
  @Get('validar-token')
  @ApiOperation({
    summary: 'Verificar token',
    description: 'Verificar solitud de recuperación de clave',
  })
  @ApiOkResponse({
    description: 'Token verificado',
    schema: {
      title: 'Token verificado',
      description: 'Token verificado',
      example: {
        isTokenValid: true,
        p_nombre: 'Nombre',
        p_apellido: 'Apellido',
        username: 'username',
        email: 'johndoe@example.com',
      },
    },
  })
  async validarToken(@Query('token') token: string) {
    try {
      const { email, oldPassword } =
        this.recuperarClaveService.validarToken(token);

      const { p_nombre, p_apellido, username, password } =
        await this.usuariosService.obtenerUsuarioPorEmail(email);

      if (oldPassword !== password) {
        throw new ForbiddenException(
          'Ya se ha cambiado la clave asociada a este email. Por favor, solicita un nuevo email de recuperación de clave.',
        );
      }

      return {
        isTokenValid: true,
        p_nombre,
        p_apellido,
        username,
        email,
      };
    } catch (error) {
      console.error({ error });

      if (error instanceof ForbiddenException) {
        throw error;
      } else if (error instanceof TokenExpiredError) {
        throw new UnauthorizedException(
          'Tu solicitud ha expirado. Por favor, solicita un nuevo email de recuperación de clave.',
        );
      } else if (error instanceof JsonWebTokenError) {
        throw new BadRequestException(
          'Tu solicitud no es válida. Por favor, solicita un nuevo email de recuperación de clave.',
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

  @Public()
  @ApiBearerAuth('access-token-cambiar-clave')
  @Patch('cambiar-clave')
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
    @Body() cambiarClave: CambiarClaveDto,
    @Headers() headers,
  ) {
    const token = headers.authorization?.split(' ')[1];

    try {
      const { email } = this.recuperarClaveService.validarToken(token);
      const usuario = await this.usuariosService.obtenerUsuarioPorEmail(email);

      const notPasswordChanges = await argon2.verify(
        usuario.password,
        cambiarClave.password,
      );

      if (notPasswordChanges) {
        throw new BadRequestException(
          'La nueva clave no puede ser igual a la clave actual.',
        );
      }

      const hash = await argon2.hash(cambiarClave.password);
      cambiarClave.password = hash;

      await this.recuperarClaveService.cambiarClave(
        email,
        cambiarClave.password,
      );

      return {
        message: `Se ha cambiado la clave del ${usuario.rol} "${usuario.p_nombre} ${usuario.p_apellido}" asociada al email ${usuario.email}. Por favor, inicia sesión con tu nueva clave.`,
      };
    } catch (error) {
      console.error({ error });

      if (error instanceof BadRequestException) {
        throw error;
      } else if (error instanceof TokenExpiredError) {
        throw new UnauthorizedException(
          'Tu solicitud ha expirado. Por favor, solicita un nuevo email de recuperación de clave.',
        );
      } else if (error instanceof JsonWebTokenError) {
        throw new BadRequestException(
          'Tu solicitud no es válida. Por favor, solicita un nuevo email de recuperación de clave.',
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
