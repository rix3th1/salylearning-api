import { Module } from '@nestjs/common';
import { CambiarClaveModule } from '../cambiar-clave/cambiar-clave.module';
import { UsuariosModule } from '../usuarios/usuarios.module';
import { RecuperarClaveController } from './recuperar-clave.controller';
import { RecuperarClaveService } from './recuperar-clave.service';

@Module({
  controllers: [RecuperarClaveController],
  providers: [RecuperarClaveService],
  imports: [UsuariosModule, CambiarClaveModule],
})
export class RecuperarClaveModule {}
