import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { AvatarUsuarioModule } from './avatar-usuario/avatar-usuario.module';
import { AvatarModule } from './avatar/avatar.module';
import { GradoUsuarioModule } from './grado-usuario/grado-usuario.module';
import { GradosModule } from './grados/grados.module';
import { LibrosModule } from './libros/libros.module';
import { MisLibrosModule } from './mis-libros/mis-libros.module';
import { PreguntasModule } from './preguntas/preguntas.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { RecuperarClaveModule } from './recuperar-clave/recuperar-clave.module';
import { ComentariosModule } from './comentario/comentarios.module';

@Module({
  imports: [
    LibrosModule,
    UsuariosModule,
    GradosModule,
    AvatarModule,
    AvatarUsuarioModule,
    GradoUsuarioModule,
    MisLibrosModule,
    PreguntasModule,
    AuthModule,
    RecuperarClaveModule,
    ComentariosModule,
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: JwtAuthGuard }],
})
export class AppModule {}
