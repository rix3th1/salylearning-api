import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OpcionesRespuestaService {
  constructor(private prisma: PrismaService) {}
}
