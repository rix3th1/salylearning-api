import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { Public } from './public.decorator';

@ApiTags('inicio', 'publico')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get()
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
        documentation: {
          docs: 'https://salylearning.vercel.app/docs',
          swagger: 'https://salylearning.vercel.app/docs/swagger',
        },
      },
    },
  })
  getHello() {
    return this.appService.getHello();
  }
}
