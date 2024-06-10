import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RespuestasService {
  constructor(private prisma: PrismaService) {}
}
