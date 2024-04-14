import { Body, Controller, NotFoundException, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from '../public.decorator';
import { UsuariosService } from '../usuarios/usuarios.service';
import { RecuperarClaveDto } from './dto/recuperar-clave.dto';
import { RecuperarClaveService } from './recuperar-clave.service';
import { Prisma } from '@prisma/client';

@Public()
@ApiTags('recuperar-clave', 'publico')
@Controller('recuperar-clave')
export class RecuperarClaveController {
  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly recuperarClaveService: RecuperarClaveService,
  ) {}

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
  async enviarEmailDeRecuperacion(@Body() datosUsuario: RecuperarClaveDto) {
    try {
      const { email } = await this.usuariosService.obtenerUsuarioPorEmail(
        datosUsuario.email,
      );

      const tokenDeRecuperacion =
        this.recuperarClaveService.generarToken(email);

      // Save the token in the DB
      await this.recuperarClaveService.guardarTokenDeRecuperacion(
        tokenDeRecuperacion,
        email,
      );

      await this.recuperarClaveService.enviarEmailDeRecuperacion(
        tokenDeRecuperacion,
        email,
      );

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

  @Post()
  async cambiarClave() {
    return {
      message: 'Clave cambiada',
    };
  }
}
