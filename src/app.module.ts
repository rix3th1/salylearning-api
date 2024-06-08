import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { AvatarUsuarioModule } from './avatar-usuario/avatar-usuario.module';
import { AvatarModule } from './avatar/avatar.module';
import { CambiarClaveModule } from './cambiar-clave/cambiar-clave.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { ContactosModule } from './contactos/contactos.module';
import { CuestionarioEstudianteModule } from './cuestionario-estudiante/cuestionario-estudiante.module';
import { CuestionariosModule } from './cuestionarios/cuestionarios.module';
import { DocentesModule } from './docentes/docentes.module';
import { EstudiantesModule } from './estudiantes/estudiantes.module';
import { FotoPerfilModule } from './foto-perfil/foto-perfil.module';
import { GenerosLiterariosModule } from './generos-literarios/generos-literarios.module';
import { GradoUsuarioModule } from './grado-usuario/grado-usuario.module';
import { GradosModule } from './grados/grados.module';
import { LibrosModule } from './libros/libros.module';
import { MisLibrosModule } from './mis-libros/mis-libros.module';
import { PerfilModule } from './perfil/perfil.module';
import { PreguntasModule } from './preguntas/preguntas.module';
import { RecuperarClaveModule } from './recuperar-clave/recuperar-clave.module';
import { RegistrarseModule } from './registrarse/registrarse.module';
import { SoporteModule } from './soporte/soporte.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { VerificarCuentaModule } from './verificar-cuenta/verificar-cuenta.module';

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
    EstudiantesModule,
    FotoPerfilModule,
    RegistrarseModule,
    VerificarCuentaModule,
    GenerosLiterariosModule,
    CuestionariosModule,
    CambiarClaveModule,
    PerfilModule,
    CuestionarioEstudianteModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppGuard],
})
export class AppModule {}
