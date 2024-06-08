import { ApiProperty } from '@nestjs/swagger';
import { CuestionarioEstudiante as TCuestionarioEstudiante } from '@prisma/client';

export class CuestionarioEstudiante implements TCuestionarioEstudiante {
  @ApiProperty({
    title: 'Id de cuestionario estudiante',
    description: 'El id del cuestionario estudiante',
    example: 1,
    minimum: 1,
    maximum: 4294967295, // 2^32 - 1 = 4.294.967.295
  })
  id: number;

  @ApiProperty({
    title: 'Id de cuestionario',
    description: 'El id del cuestionario',
    example: 1,
    minimum: 1,
    maximum: 4294967295, // 2^32 - 1 = 4.294.967.295
  })
  id_cuestionario: number;

  @ApiProperty({
    title: 'Id de estudiante',
    description: 'El id del estudiante',
    example: 1,
    minimum: 1,
    maximum: 4294967295, // 2^32 - 1 = 4.294.967.295
  })
  id_estudiante: number;
}
