import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';
import { Public } from './public.decorator';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @ApiTags('login')
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  @ApiOperation({
    summary: 'Login',
    description: 'Login de usuario',
  })
  @ApiResponse({
    status: 200,
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
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Get('perfil')
  @ApiTags('perfil')
  @ApiOperation({
    summary: 'Perfil de usuario',
    description: 'Obtiene el perfil de usuario',
  })
  @ApiResponse({
    status: 200,
    description: 'Perfil de usuario',
    schema: {
      title: 'Perfil de usuario',
      description: 'Perfil de usuario',
      example: {
        id: 1,
        username: 'XXXX',
        email: 'XXXX@gmail.com',
      },
    },
  })
  getProfile(@Request() req) {
    return req.user;
  }
}
