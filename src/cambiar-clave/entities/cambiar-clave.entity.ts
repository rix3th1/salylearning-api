import { ApiProperty } from '@nestjs/swagger';

export class CambiarClave {
  @ApiProperty({
    title: 'Contraseña actual',
    description: 'Contraseña actual del usuario',
    example: 'Password123!',
    minLength: 8,
    maxLength: 50,
  })
  current_password: string;
}
