import {
  SwaggerCustomOptions,
  type SwaggerDocumentOptions,
} from '@nestjs/swagger';

export const swaggerDocOpts: SwaggerDocumentOptions = {
  operationIdFactory: (_controllerKey: string, methodKey: string) => methodKey,
};

export const swaggerCustomOpts: SwaggerCustomOptions = {
  customSiteTitle: 'Salylearning API Documentación',
};
