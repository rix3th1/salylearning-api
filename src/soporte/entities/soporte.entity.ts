import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Contacto } from '../../contactos/entities/contacto.entity';

export class Soporte
  extends OmitType(Contacto, ['telefono'] as const)
  implements Soporte
{
  @ApiProperty({
    title: 'Asunto',
    description: 'Asunto del mensaje',
    example: 'Solicitud de soporte',
    minLength: 5,
    maxLength: 50,
  })
  asunto: string;
}
