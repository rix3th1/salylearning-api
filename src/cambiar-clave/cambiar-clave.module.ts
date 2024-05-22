import { Module } from '@nestjs/common';
import { UsuariosModule } from '../usuarios/usuarios.module';
import { CambiarClaveController } from './cambiar-clave.controller';
import { CambiarClaveService } from './cambiar-clave.service';

@Module({
  controllers: [CambiarClaveController],
  providers: [CambiarClaveService],
  imports: [UsuariosModule],
  exports: [CambiarClaveService],
})
export class CambiarClaveModule {}
