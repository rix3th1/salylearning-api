import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LibrosEstudianteService {
  constructor(private prisma: PrismaService) {}
}
