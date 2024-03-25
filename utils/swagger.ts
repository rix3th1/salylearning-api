import { type SwaggerDocumentOptions } from '@nestjs/swagger';

export const options: SwaggerDocumentOptions = {
  operationIdFactory: (_controllerKey: string, methodKey: string) => methodKey,
};
