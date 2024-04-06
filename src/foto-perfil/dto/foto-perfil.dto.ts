import { ApiPropertyOptional, OmitType, PartialType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, Max, Min } from 'class-validator';
import { FotoPerfil } from '../entities/foto-perfil.entity';

export class CrearFotoPerfilDto extends OmitType(FotoPerfil, ['id'] as const) {
  @IsNotEmpty({ message: 'El id de usuario es requerido' })
  @IsInt({ message: 'El id de usuario debe ser un número entero' })
  @Min(1, { message: 'El id de usuario debe ser mayor o igual a 1' })
  @Max(4294967295, {
    message: 'El id de usuario debe ser menor o igual a 4294967295', // 2^32 - 1 = 4.294.967.295
  })
  @Transform(({ value: id_usuario }) => parseInt(id_usuario))
  id_usuario: number;

  foto: string;
}

export class ActualizarFotoPerfilDto extends PartialType(CrearFotoPerfilDto) {
  @ApiPropertyOptional()
  @IsOptional()
  id_usuario?: number;

  @ApiPropertyOptional()
  @IsOptional()
  foto?: string;
}
