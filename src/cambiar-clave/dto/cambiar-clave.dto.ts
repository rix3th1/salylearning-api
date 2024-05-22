import { IntersectionType } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';
import { NotMatch } from '../../match.decorator';
import { CambiarClaveRecuperacionDto } from '../../recuperar-clave/dto/recuperar-clave.dto';
import { CambiarClave } from '../entities/cambiar-clave.entity';

export class CambiarClaveDto extends IntersectionType(
  CambiarClaveRecuperacionDto,
  CambiarClave,
) {
  @IsNotEmpty({ message: 'La contraseña actual es requerida' })
  @IsString({ message: 'La contraseña actual debe ser una cadena de texto' })
  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minNumbers: 1,
      minSymbols: 1,
      minUppercase: 1,
    },
    {
      message:
        'La contraseña actual debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un símbolo',
    },
  )
  @NotMatch('password', {
    message: 'La contraseña actual no puede ser igual a la nueva contraseña',
  })
  declare current_password: string;
}
