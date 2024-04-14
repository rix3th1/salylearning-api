import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Salylearning API')
    .setDescription('Descripción de la API Salylearning')
    .setVersion('1.0')
    .addBearerAuth(
      {
        name: 'Authorization',
        description: 'Ingrese el token JWT',
        bearerFormat: 'Bearer',
        scheme: 'Bearer',
        type: 'http',
        in: 'Header',
      },
      'access-token',
    )
    .addBearerAuth(
      {
        name: 'token-cambiar-clave',
        description: 'Ingrese el token JWT para cambiar la clave',
        bearerFormat: 'Bearer',
        scheme: 'Bearer',
        type: 'http',
        in: 'Header',
      },
      'access-token-cambiar-clave',
    )
    .addTag('publico')
    .addTag('inicio')
    .addTag('login')
    .addTag('recuperar-clave')
    .addTag('perfil')
    .addTag('avatar')
    .addTag('avatar-usuario')
    .addTag('grado-usuario')
    .addTag('grados')
    .addTag('libros')
    .addTag('mis-libros')
    .addTag('preguntas')
    .addTag('usuarios')
    .addTag('contactos')
    .addTag('soporte')
    .addTag('docentes')
    .addTag('estudiantes')
    .addTag('foto-perfil')
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    operationIdFactory: (_controllerKey: string, methodKey: string) =>
      methodKey,
  });
  SwaggerModule.setup('docs', app, document, {
    customSiteTitle: 'Salylearning API Documentación',
    customfavIcon:
      'https://static1.smartbear.co/swagger/media/assets/swagger_fav.png',
    customJs: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.12.3/swagger-ui-bundle.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.12.3/swagger-ui-standalone-preset.min.js',
    ],
    customCssUrl:
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.12.3/swagger-ui.min.css',
  });

  await app.listen(3000);

  console.info(`Salylearning API is running on: ${await app.getUrl()}`);
  console.info(`Docs is running on: ${await app.getUrl()}/docs`);
}
bootstrap();
