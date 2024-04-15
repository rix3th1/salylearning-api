import { ApiProperty, ApiPropertyOptional, OmitType } from '@nestjs/swagger';
import { $Enums, Usuario as TUsuario } from '@prisma/client';

export class Usuario implements Partial<TUsuario> {
  @ApiProperty({
    title: 'Id usuario',
    description: 'Id del usuario',
    example: 1,
    minLength: 1,
    maxLength: 4294967295,
  })
  id: number;

  @ApiProperty({
    title: 'Nombre de usuario',
    description: 'Nombre de usuario para el registro',
    example: 'johndoe',
    minLength: 4,
    maxLength: 50,
  })
  username: string;

  @ApiProperty({
    title: 'Primer nombre',
    description: 'Primer nombre del usuario',
    example: 'John',
    minLength: 3,
    maxLength: 30,
  })
  p_nombre: string;

  @ApiPropertyOptional({
    title: 'Segundo nombre',
    description: 'Segundo nombre del usuario (Opcional)',
    example: 'James',
    minLength: 3,
    maxLength: 30,
  })
  s_nombre?: string;

  @ApiProperty({
    title: 'Primer apellido',
    description: 'Primer apellido del usuario',
    example: 'Doe',
    minLength: 3,
    maxLength: 30,
  })
  p_apellido: string;

  @ApiPropertyOptional({
    title: 'Segundo apellido',
    description: 'Segundo apellido del usuario (Opcional)',
    example: 'Smith',
    minLength: 3,
    maxLength: 30,
  })
  s_apellido?: string;

  @ApiProperty({
    title: 'Edad',
    description: 'Edad del usuario',
    example: 30,
    minLength: 1,
    maxLength: 100,
  })
  edad: number;

  @ApiPropertyOptional({
    title: 'Fecha de nacimiento',
    description: 'Fecha de nacimiento del usuario (Opcional)',
    example: '2018-12-10',
  })
  fecha_nacimiento?: Date;

  @ApiPropertyOptional({
    title: 'Ciudad',
    description: 'Ciudad del usuario (Opcional)',
    example: 'Espinal',
    minLength: 3,
    maxLength: 50,
  })
  ciudad?: string;

  @ApiProperty({
    title: 'Email',
    description: 'Email del usuario',
    example: 'johndoe@example.com',
    minLength: 5,
    maxLength: 100,
  })
  email: string;

  @ApiProperty({
    title: 'Contraseña',
    description: 'Contraseña del usuario',
    example: 'Password123!',
    minLength: 8,
    maxLength: 50,
  })
  password: string;

  @ApiPropertyOptional({
    title: 'Rol',
    description: "Rol del usuario (Opcional, por defecto 'Estudiante')",
    example: 'Estudiante',
    enum: $Enums.Rol,
    default: $Enums.Rol.Estudiante,
    minLength: 3,
    maxLength: 30,
  })
  rol?: $Enums.Rol;

  @ApiPropertyOptional({
    title: 'Verificado',
    description: 'Usuario verificado (Opcional, por defecto false)',
    example: false,
  })
  verificado?: boolean;
}

export class UsuarioRespuesta extends OmitType(Usuario, [
  'password',
] as const) {}

export class Perfil extends UsuarioRespuesta {
  @ApiProperty({
    title: 'Id usuario',
    description: 'Id del usuario',
    example: 1,
    minLength: 1,
    maxLength: 4294967295,
    name: 'userId',
  })
  id: number;
}
