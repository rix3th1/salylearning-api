import {
  BadGatewayException,
  BadRequestException,
  Body,
  Controller,
  Headers,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import * as argon2 from 'argon2';
import { Public } from '../public.decorator';
import { UsuarioRespuesta } from '../usuarios/entities/usuario.entity';
import { RegistrarseDto } from './dto/registrarse.dto';
import { RegistrarseService } from './registrarse.service';

@Controller('auth/registrarse')
export class RegistrarseController {
  constructor(private readonly registrarseService: RegistrarseService) {}

  @Post()
  @Public()
  @ApiTags('registrarse', 'publico')
  @ApiOperation({
    summary: 'Registrarse',
    description: 'Registro de usuario',
  })
  @ApiCreatedResponse({
    description: 'Usuario registrado',
    type: UsuarioRespuesta,
  })
  async registrarse(@Body() nuevoUsuario: RegistrarseDto, @Headers() headers) {
    try {
      const hash = await argon2.hash(nuevoUsuario.password);
      nuevoUsuario.password = hash;

      // Delete confirmar_password property because it is not needed in the database
      delete nuevoUsuario.confirmar_password;
      const usuario =
        await this.registrarseService.registrarUsuario(nuevoUsuario);
      // Delete password property from the response because it is sensitive
      delete usuario.password;

      // Generate activation token
      const tokenDeActivacion =
        this.registrarseService.generarTokenDeActivacion({
          email: usuario.email,
        });

      // Send the email to activate account
      const response = await this.registrarseService.enviarEmailDeVerificacion(
        headers.origin,
        tokenDeActivacion,
        usuario.email,
      );

      if (response.error) {
        throw new BadGatewayException(
          `Error al enviar el email de verificación a "${usuario.email}". Por favor, intenta de nuevo más tarde.`,
        );
      }

      return {
        message: `Usuario registrado. Se ha enviado un email de verificación a "${usuario.email}". Por favor, verifica tu cuenta.`,
        usuario,
      };
    } catch (error) {
      console.error(error.message);

      if (error instanceof BadGatewayException) {
        throw error;
      } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new BadRequestException(
            'El email, el nombre de usuario o el grado ya existen',
          );
        } else if (error.code === 'P2003') {
          throw new BadRequestException('El id de grado del usuario no existe');
        }
      }

      throw new InternalServerErrorException('Error al registrar el usuario');
    }
  }
}
