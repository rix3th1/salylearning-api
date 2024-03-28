import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CrearContactoDto } from './dto/contactos.dto';
import { Contacto } from './entities/contacto.entity';

@Injectable()
export class ContactosService {
  constructor(private prismaService: PrismaService) {}

  async crearContacto(contacto: CrearContactoDto): Promise<Contacto> {
    return this.prismaService.contactos.create({ data: contacto });
  }
}
