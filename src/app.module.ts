import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { AvatarUsuarioModule } from './avatar-usuario/avatar-usuario.module';
import { AvatarModule } from './avatar/avatar.module';
import { GradoUsuarioModule } from './grado-usuario/grado-usuario.module';
import { GradosModule } from './grados/grados.module';
import { LibrosModule } from './libros/libros.module';
import { MisLibrosModule } from './mis-libros/mis-libros.module';
import { PreguntasModule } from './preguntas/preguntas.module';
import { UsuariosModule } from './usuarios/usuarios.module';

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
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
