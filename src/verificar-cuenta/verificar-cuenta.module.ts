import { Module } from '@nestjs/common';
import { UsuariosModule } from '../usuarios/usuarios.module';
import { VerificarCuentaController } from './verificar-cuenta.controller';
import { VerificarCuentaService } from './verificar-cuenta.service';

@Module({
  controllers: [VerificarCuentaController],
  providers: [VerificarCuentaService],
  imports: [UsuariosModule],
})
export class VerificarCuentaModule {}
