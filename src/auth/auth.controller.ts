import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import type { Request } from 'express';
import { Public } from '../public.decorator';
import { AuthService } from './auth.service';
import { LoginUsuarioDto } from './dto/auth.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

@ApiTags('login', 'publico')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
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
  async login(@Req() req: Request) {
    return this.authService.login(req.user);
  }
}
