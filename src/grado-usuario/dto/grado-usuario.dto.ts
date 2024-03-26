import { ApiPropertyOptional, OmitType, PartialType } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, Max, Min } from 'class-validator';
import { GradoUsuario } from '../entities/grado-usuario.entity';

export class CrearGradoUsuarioDto extends OmitType(GradoUsuario, [
  'id',
] as const) {
  @IsNotEmpty({ message: 'El id de grado es requerido' })
  @IsInt({ message: 'El id de grado debe ser un número entero' })
  @Min(1, { message: 'El id de grado debe ser mayor o igual a 1' })
  @Max(4294967295, {
    message: 'El id de grado debe ser menor o igual a 4294967295', // 2^32 - 1 = 4.294.967.295
  })
  id_grado: number;

  @IsNotEmpty({ message: 'El id de usuario es requerido' })
  @IsInt({ message: 'El id de usuario debe ser un número entero' })
  @Min(1, { message: 'El id de usuario debe ser mayor o igual a 1' })
  @Max(4294967295, {
    message: 'El id de usuario debe ser menor o igual a 4294967295', // 2^32 - 1 = 4.294.967.295
  })
  id_usuario: number;
}

export class ActualizarGradoUsuarioDto extends PartialType(
  CrearGradoUsuarioDto,
) {
  @ApiPropertyOptional()
  @IsOptional()
  id_grado?: number;

  @ApiPropertyOptional()
  @IsOptional()
  id_usuario?: number;
}
