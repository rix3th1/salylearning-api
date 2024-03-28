import { Injectable } from '@nestjs/common';
import { Comentario } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CrearComentarioDto } from './dto/comentario.dto';

@Injectable()
export class ComentarioService {
  constructor(private prismaService: PrismaService) {}

  async crearComentario(comentario: CrearComentarioDto): Promise<Comentario> {
    return this.prismaService.comentario.create({ data: comentario });
  }
}
