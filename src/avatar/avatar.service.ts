import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ActualizarAvatarDto, CrearAvatarDto } from './dto/avatar.dto';
import { Avatar } from './entities/avatar.entity';

@Injectable()
export class AvatarService {
  constructor(private prisma: PrismaService) {}

  async obtenerAvatares(): Promise<Avatar[]> {
    return this.prisma.avatar.findMany();
  }

  async obtenerAvatar(id: number): Promise<Avatar> {
    return this.prisma.avatar.findUniqueOrThrow({ where: { id } });
  }

  async crearAvatar(avatar: CrearAvatarDto): Promise<Avatar> {
    return this.prisma.avatar.create({ data: avatar });
  }

  async actualizarAvatar(
    id: number,
    avatar: ActualizarAvatarDto,
  ): Promise<Avatar> {
    return this.prisma.avatar.update({ where: { id }, data: avatar });
  }

  async eliminarAvatar(id: number): Promise<Avatar> {
    return this.prisma.avatar.delete({ where: { id } });
  }
}
