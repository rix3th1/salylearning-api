import { Injectable } from '@nestjs/common';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { PrismaService } from '../prisma/prisma.service';
import {
  ActualizarFotoPerfilDto,
  CrearFotoPerfilDto,
} from './dto/foto-perfil.dto';
import { FotoPerfil } from './entities/foto-perfil.entity';

@Injectable()
export class FotoPerfilService {
  constructor(
    private prisma: PrismaService,
    private cloudinary: CloudinaryService,
  ) {}

  async obtenerFotosPerfil(): Promise<FotoPerfil[]> {
    return this.prisma.fotoPerfil.findMany();
  }

  async obtenerFotoPerfil(id: number): Promise<FotoPerfil> {
    return this.prisma.fotoPerfil.findUniqueOrThrow({ where: { id } });
  }

  async crearFotoPerfil(fotoPerfil: CrearFotoPerfilDto): Promise<FotoPerfil> {
    return this.prisma.fotoPerfil.create({ data: fotoPerfil });
  }

  async subirFotoCloudinary(foto: Express.Multer.File) {
    return this.cloudinary.subirImagen(foto);
  }

  async eliminarFotoCloudinary(public_id: string) {
    return this.cloudinary.eliminarImagen(public_id);
  }

  async actualizarFotoPerfil(
    id: number,
    fotoPerfil: ActualizarFotoPerfilDto,
  ): Promise<FotoPerfil> {
    return this.prisma.fotoPerfil.update({ where: { id }, data: fotoPerfil });
  }

  async eliminarFotoPerfil(id: number): Promise<FotoPerfil> {
    return this.prisma.fotoPerfil.delete({ where: { id } });
  }
}
