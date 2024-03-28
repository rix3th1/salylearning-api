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
  MaxLength,
  MinLength,
} from 'class-validator';
import { CrearContactoDto } from '../../contactos/dto/contactos.dto';
import { Soporte } from '../entities/soporte.entity';

export class CrearSoporteDto extends IntersectionType(
  OmitType(CrearContactoDto, ['telefono'] as const),
  PickType(Soporte, ['asunto']),
) {
  @IsNotEmpty({ message: 'El asunto del mensaje es requerido' })
  @IsString({ message: 'El asunto del mensaje debe ser una cadena de texto' })
  @MinLength(5, {
    message: 'El asunto del mensaje debe tener al menos 10 caracteres',
  })
  @MaxLength(50, {
    message: 'El asunto del mensaje debe tener menos de 500 caracteres',
  })
  asunto: string;
}

export class ActualizarSoporteDto extends PartialType(CrearSoporteDto) {
  @ApiPropertyOptional()
  @IsOptional()
  nombre_completo?: string;

  @ApiPropertyOptional()
  @IsOptional()
  email?: string;

  @ApiPropertyOptional()
  @IsOptional()
  asunto?: string;

  @ApiPropertyOptional()
  @IsOptional()
  mensaje?: string;
}
