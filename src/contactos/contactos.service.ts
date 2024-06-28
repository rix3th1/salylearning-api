import { BadGatewayException, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { sendEmail } from '../nodemailer';
import { PrismaService } from '../prisma/prisma.service';
import { ActualizarContactoDto, CrearContactoDto } from './dto/contactos.dto';
import { Contacto } from './entities/contacto.entity';

interface emailPayload {
  nombre_completo: string;
}

@Injectable()
export class ContactosService {
  constructor(private prisma: PrismaService) {}

  @OnEvent('enviar-email-de-agradecimiento-por-contactar', { async: true })
  async enviarGraciasPorContactar(
    to: string,
    { nombre_completo }: emailPayload,
  ) {
    const html = `
      <h1>Gracias por contactar a Salylearning</h1>
      <p>Sr. <strong>${nombre_completo}</strong>, tu mensaje ha sido enviado. 🚀</p>
      <p>Saludos cordiales,</p>
      <p>El equipo de Salylearning</p>
    `;

    const response = await sendEmail(
      to,
      'Gracias por contactar a Salylearning',
      html,
    );

    if (response.error) {
      throw new BadGatewayException(
        'Error al enviar el email de agradecimiento por contactar. Por favor, intenta de nuevo más tarde.',
      );
    }
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
