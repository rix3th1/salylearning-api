import {
  SwaggerCustomOptions,
  type SwaggerDocumentOptions,
} from '@nestjs/swagger';

export const swaggerDocOpts: SwaggerDocumentOptions = {
  operationIdFactory: (_controllerKey: string, methodKey: string) => methodKey,
};

export const swaggerCustomOpts: SwaggerCustomOptions = {
  customSiteTitle: 'Salylearning API Documentación',
  customJs: [
    'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.12.3/swagger-ui-bundle.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.12.3/swagger-ui-standalone-preset.min.js',
  ],
  customCssUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.12.3/swagger-ui.min.css',
};
