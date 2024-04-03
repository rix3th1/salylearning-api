import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    return {
      message: 'Bienvenido a la API de Salylearning',
      version: '1.0.0',
      docs: `${process.env[process.env.NODE_ENV === 'production' ? 'PROD_PROJECT_URL' : 'DEV_PROJECT_URL']}/docs`,
    };
  }
}
