import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsuariosModule } from 'src/usuarios/usuarios.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [UsuariosModule, PassportModule],
  providers: [AuthService, LocalStrategy],
})
export class AuthModule {}
