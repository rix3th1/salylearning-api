import { ApiProperty } from '@nestjs/swagger';

export class Registrarse {
  @ApiProperty({
    title: 'Confirmar contraseña',
    description: 'Confirmación de la contraseña del usuario',
    example: 'Password123!',
    minLength: 8,
    maxLength: 50,
  })
  confirmar_password: string;
}
