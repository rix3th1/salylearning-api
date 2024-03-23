import { Module } from '@nestjs/common';
import { LibrosModule } from './libros/libros.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { GradosModule } from './grados/grados.module';

@Module({
  imports: [LibrosModule, UsuariosModule, GradosModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
