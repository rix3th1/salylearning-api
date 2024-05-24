import { Module } from '@nestjs/common';
import { PerfilController } from './perfil.controller';

@Module({
  controllers: [PerfilController],
})
export class PerfilModule {}
