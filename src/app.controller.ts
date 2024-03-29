import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { LoginUsuarioDto } from './auth/dto/auth.dto';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';
import { Public } from './public.decorator';
import { Perfil } from './usuarios/entities/usuario.entity';

@Controller()
export class AppController {
  constructor(
    private readonly authService: AuthService,
    private readonly appService: AppService,
  ) {}

  @Public()
  @Get()
  @ApiTags('inicio', 'publico')
  @ApiOperation({
    summary: 'Inicio',
    description: 'Inicio de la aplicacion',
  })
  @ApiOkResponse({
    description: 'Inicio de la aplicacion',
    schema: {
      title: 'Inicio de la aplicacion',
      description: 'Inicio de la aplicacion',
      example: {
        message: 'Bienvenido a la API de Salylearning',
        version: '1.0.0',
        docs: 'https://salylearning.vercel.app/docs',
      },
    },
  })
  getHello() {
    return this.appService.getHello();
  }

  @Public()
  @ApiTags('login', 'publico')
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  @ApiOperation({
    summary: 'Login',
    description: 'Login de usuario',
  })
  @ApiCreatedResponse({
    description: 'Login exitoso',
    schema: {
      title: 'Token de acceso',
      description: 'Token de acceso',
      example: {
        access_token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwia',
      },
    },
  })
  @ApiBody({
    description: 'Login de usuario',
    type: LoginUsuarioDto,
  })
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @ApiBearerAuth('access-token')
  @Get('perfil')
  @ApiTags('perfil')
  @ApiOperation({
    summary: 'Perfil de usuario',
    description: 'Obtiene el perfil de usuario',
  })
  @ApiOkResponse({
    description: 'Perfil de usuario',
    type: Perfil,
  })
  getProfile(@Request() req) {
    return req.user;
  }
}
