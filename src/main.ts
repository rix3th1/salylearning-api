import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { swaggerCustomOpts, swaggerDocOpts } from './swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Salylearning API')
    .setDescription(
      'Esta es la documentacion de la api para el software salylearning. La siguiente es una descripcion detallada de los metodos y urls en los que debe consultar la api en el frontend de salylearning.',
    )
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

  const document = SwaggerModule.createDocument(app, config, swaggerDocOpts);
  SwaggerModule.setup('documentacion', app, document, swaggerCustomOpts);

  await app.listen(3000);

  console.log(`Salylearning API is running on: ${await app.getUrl()}`);
}
bootstrap();
