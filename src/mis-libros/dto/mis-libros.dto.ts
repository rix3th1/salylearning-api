import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { MisLibros } from '@prisma/client';
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  Max,
  Min,
} from 'class-validator';

export class CrearMiLibroDto implements Partial<MisLibros> {
  @ApiProperty()
  @IsNotEmpty({ message: 'El id de libro es requerido' })
  @IsInt({ message: 'El id de libro debe ser un número entero' })
  @Min(1, { message: 'El id de libro debe ser mayor o igual a 1' })
  @Max(4294967295, {
    message: 'El id de libro debe ser menor o igual a 4294967295', // 2^32 - 1 = 4.294.967.295
  })
  id_libro: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'El id de usuario es requerido' })
  @IsInt({ message: 'El id de usuario debe ser un número entero' })
  @Min(1, { message: 'El id de usuario debe ser mayor o igual a 1' })
  @Max(4294967295, {
    message: 'El id de usuario debe ser menor o igual a 4294967295', // 2^32 - 1 = 4.294.967.295
  })
  id_usuario: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'El estado del libro es requerido' })
  @IsBoolean({ message: 'El estado del libro debe ser un valor booleano' })
  terminado: boolean;
}

export class ActualizarMiLibroDto implements Partial<MisLibros> {
  @ApiPropertyOptional()
  @IsOptional()
  @IsInt({ message: 'El id de libro debe ser un número entero' })
  @Min(1, { message: 'El id de libro debe ser mayor o igual a 1' })
  @Max(4294967295, {
    message: 'El id de libro debe ser menor o igual a 4294967295', // 2^32 - 1 = 4.294.967.295
  })
  id_libro?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt({ message: 'El id de usuario debe ser un número entero' })
  @Min(1, { message: 'El id de usuario debe ser mayor o igual a 1' })
  @Max(4294967295, {
    message: 'El id de usuario debe ser menor o igual a 4294967295', // 2^32 - 1 = 4.294.967.295
  })
  id_usuario?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean({ message: 'El estado del libro debe ser un valor booleano' })
  terminado?: boolean;
}
