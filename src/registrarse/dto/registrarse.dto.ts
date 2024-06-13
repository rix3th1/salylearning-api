import {
  ApiPropertyOptional,
  IntersectionType,
  OmitType,
  PartialType,
  PickType,
} from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { CrearDocenteDto } from 'src/docentes/dto/docentes.dto';
import { CrearGradoUsuarioDto } from '../../grado-usuario/dto/grado-usuario.dto';
import { Match } from '../../match.decorator';
import { CrearUsuarioDto } from '../../usuarios/dto/usuarios.dto';
import { Registrarse } from '../entities/registrarse.entity';

export class RegistrarseDto extends IntersectionType(
  OmitType(CrearUsuarioDto, [
    'fecha_nacimiento',
    'ciudad',
    'verificado',
  ] as const),
  Registrarse,
  PickType(PartialType(CrearDocenteDto), ['cod_docente'] as const),
  PickType(PartialType(CrearGradoUsuarioDto), ['id_grado'] as const),
) {
  @IsNotEmpty({ message: 'La confirmación de la contraseña es requerida' })
  @IsString({
    message: 'La confirmación de la contraseña debe ser una cadena de texto',
  })
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
        'La confirmación de la contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un símbolo',
    },
  )
  @Match('password', { message: 'Las contraseñas no coinciden' })
  declare confirmar_password: string;

  @ApiPropertyOptional()
  @IsOptional()
  id_grado?: number;

  @ApiPropertyOptional()
  @IsOptional()
  cod_docente?: string;
}
