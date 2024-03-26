import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { options } from 'utils/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Salylearning API')
    .setDescription('Salylearning API description')
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

  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);

  console.log(`Salylearning API is running on: ${await app.getUrl()}`);
}
bootstrap();
