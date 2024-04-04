import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { AvatarUsuarioModule } from './avatar-usuario/avatar-usuario.module';
import { AvatarModule } from './avatar/avatar.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { ContactosModule } from './contactos/contactos.module';
import { DocentesModule } from './docentes/docentes.module';
import { GradoUsuarioModule } from './grado-usuario/grado-usuario.module';
import { GradosModule } from './grados/grados.module';
import { LibrosModule } from './libros/libros.module';
import { MisLibrosModule } from './mis-libros/mis-libros.module';
import { PreguntasModule } from './preguntas/preguntas.module';
import { RecuperarClaveModule } from './recuperar-clave/recuperar-clave.module';
import { SoporteModule } from './soporte/soporte.module';
import { UsuariosModule } from './usuarios/usuarios.module';

const AppGuard = {
  provide: APP_GUARD,
  useClass: JwtAuthGuard,
};

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
    ContactosModule,
    SoporteModule,
    CloudinaryModule,
    DocentesModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppGuard],
})
export class AppModule {}
