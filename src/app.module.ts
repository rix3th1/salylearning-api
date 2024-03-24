import { Module } from '@nestjs/common';
import { AvatarUsuarioModule } from './avatar-usuario/avatar-usuario.module';
import { AvatarModule } from './avatar/avatar.module';
import { GradosModule } from './grados/grados.module';
import { LibrosModule } from './libros/libros.module';
import { UsuariosModule } from './usuarios/usuarios.module';

@Module({
  imports: [
    LibrosModule,
    UsuariosModule,
    GradosModule,
    AvatarModule,
    AvatarUsuarioModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
