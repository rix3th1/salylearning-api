import { ApiProperty } from '@nestjs/swagger';
import { GradoUsuario } from '@prisma/client';
import { IsInt, IsNotEmpty, Max, Min } from 'class-validator';

export class GradoUsuarioBaseDto implements Partial<GradoUsuario> {
  @ApiProperty({
    title: 'Id de grado',
    description: 'El id de grado del usuario',
    example: 1,
    minimum: 1,
    maximum: 4294967295, // 2^32 - 1 = 4.294.967.295
  })
  @IsNotEmpty({ message: 'El id de grado es requerido' })
  @IsInt({ message: 'El id de grado debe ser un número entero' })
  @Min(1, { message: 'El id de grado debe ser mayor o igual a 1' })
  @Max(4294967295, {
    message: 'El id de grado debe ser menor o igual a 4294967295', // 2^32 - 1 = 4.294.967.295
  })
  id_grado?: number;

  @ApiProperty({
    title: 'Id de usuario',
    description: 'El id de usuario del grado',
    example: 1,
    minimum: 1,
    maximum: 4294967295, // 2^32 - 1 = 4.294.967.295,
  })
  @IsNotEmpty({ message: 'El id de usuario es requerido' })
  @IsInt({ message: 'El id de usuario debe ser un número entero' })
  @Min(1, { message: 'El id de usuario debe ser mayor o igual a 1' })
  @Max(4294967295, {
    message: 'El id de usuario debe ser menor o igual a 4294967295', // 2^32 - 1 = 4.294.967.295
  })
  id_usuario?: number;
}
