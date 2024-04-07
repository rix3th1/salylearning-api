import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ActualizarContactoDto, CrearContactoDto } from './dto/contactos.dto';
import { Contacto } from './entities/contacto.entity';

@Injectable()
export class ContactosService {
  constructor(private prisma: PrismaService) {}

  async obtenerContactos(): Promise<Contacto[]> {
    return this.prisma.contacto.findMany();
  }

  async obtenerContacto(id: number): Promise<Contacto> {
    return this.prisma.contacto.findUniqueOrThrow({ where: { id } });
  }

  async crearContacto(contacto: CrearContactoDto): Promise<Contacto> {
    return this.prisma.contacto.create({ data: contacto });
  }

  async actualizarContacto(
    id: number,
    contacto: ActualizarContactoDto,
  ): Promise<Contacto> {
    return this.prisma.contacto.update({
      where: { id },
      data: contacto,
    });
  }

  async eliminarContacto(id: number): Promise<Contacto> {
    return this.prisma.contacto.delete({ where: { id } });
  }
}
