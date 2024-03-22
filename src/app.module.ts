import { Module } from '@nestjs/common';
import { LibrosModule } from './libros/libros.module';
import { UsuariosModule } from './usuarios/usuarios.module';

@Module({
  imports: [LibrosModule, UsuariosModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
