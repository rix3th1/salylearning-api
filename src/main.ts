import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Salylearning API')
    .setDescription('The Salylearning API description')
    .setVersion('1.0')
    .addTag('avatar')
    .addTag('avatar-usuario')
    .addTag('grado-usuario')
    .addTag('grados')
    .addTag('libros')
    .addTag('mis-libros')
    .addTag('preguntas')
    .addTag('usuarios')
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    operationIdFactory: (_controllerKey: string, methodKey: string) =>
      methodKey,
  });
  SwaggerModule.setup('docs', app, document, {
    customSiteTitle: 'Salylearning API Documentación',
    customJs: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.12.3/swagger-ui-bundle.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.12.3/swagger-ui-standalone-preset.min.js',
    ],
    customCssUrl:
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.12.3/swagger-ui.min.css',
  });

  await app.listen(3000);

  console.log(`Salylearning API is running on: ${await app.getUrl()}`);
}
bootstrap();
