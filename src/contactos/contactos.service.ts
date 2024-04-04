import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ActualizarContactoDto, CrearContactoDto } from './dto/contactos.dto';
import { Contacto } from './entities/contacto.entity';

@Injectable()
export class ContactosService {
  constructor(private prismaService: PrismaService) {}

  async obtenerContactos(): Promise<Contacto[]> {
    return this.prismaService.contactos.findMany();
  }

  async obtenerContacto(id: number): Promise<Contacto> {
    return this.prismaService.contactos.findUniqueOrThrow({ where: { id } });
  }

  async crearContacto(contacto: CrearContactoDto): Promise<Contacto> {
    return this.prismaService.contactos.create({ data: contacto });
  }

  async actualizarContacto(
    id: number,
    contacto: ActualizarContactoDto,
  ): Promise<Contacto> {
    return this.prismaService.contactos.update({
      where: { id },
      data: contacto,
    });
  }

  async eliminarContacto(id: number): Promise<Contacto> {
    return this.prismaService.contactos.delete({ where: { id } });
  }
}
