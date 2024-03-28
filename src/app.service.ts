import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    return {
      message: 'Bienvenido a la API de Salylearning',
      version: '1.0.0',
      docs: 'https://salylearning.vercel.app/docs',
    };
  }
}
