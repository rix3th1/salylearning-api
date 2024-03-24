import { Module } from '@nestjs/common';
import { AvatarModule } from './avatar/avatar.module';
import { GradosModule } from './grados/grados.module';
import { LibrosModule } from './libros/libros.module';
import { UsuariosModule } from './usuarios/usuarios.module';

@Module({
  imports: [LibrosModule, UsuariosModule, GradosModule, AvatarModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
