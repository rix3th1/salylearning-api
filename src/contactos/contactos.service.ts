import { Injectable } from '@nestjs/common';
import { sendEmail } from '../nodemailer';
import { PrismaService } from '../prisma/prisma.service';
import { ActualizarContactoDto, CrearContactoDto } from './dto/contactos.dto';
import { Contacto } from './entities/contacto.entity';

@Injectable()
export class ContactosService {
  constructor(private prisma: PrismaService) {}

  async enviarGraciasPorContactar(to: string) {
    const html = `
      <h1>Gracias por contactar a Salylearning</h1>
      <p>En breve nos pondremos en contacto contigo. 🚀</p>
    `;

    return sendEmail(to, 'Gracias por contactar a Salylearning', html);
  }

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
