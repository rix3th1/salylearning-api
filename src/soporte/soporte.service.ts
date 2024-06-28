import { BadGatewayException, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { sendEmail } from '../nodemailer';
import { PrismaService } from '../prisma/prisma.service';
import { ActualizarSoporteDto, CrearSoporteDto } from './dto/soporte.dto';
import { Soporte } from './entities/soporte.entity';

interface emailPayload {
  username: string;
  p_nombre: string;
  p_apellido: string;
}

@Injectable()
export class SoporteService {
  constructor(private prisma: PrismaService) {}

  @OnEvent('enviar-email-de-soporte', { async: true })
  async enviarGraciasPorContactarSoporte(
    to: string,
    { username, p_nombre, p_apellido }: emailPayload,
  ) {
    const html = `
      <h1>Gracias por contactar a Salylearning</h1>
      <p>Sr. usuario <strong>${username}</strong>, <strong>${p_nombre} ${p_apellido}</strong>, por contactar con nosotros, nos ha permitido ofrecerte soporte. Por favor, espera un poco más para que te contactemos.</p>
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

  async obtenerSoportes(): Promise<Soporte[]> {
    return this.prisma.soporte.findMany();
  }

  async obtenerSoporte(id: number): Promise<Soporte> {
    return this.prisma.soporte.findUniqueOrThrow({ where: { id } });
  }

  async crearSoporte(soporte: CrearSoporteDto): Promise<Soporte> {
    return this.prisma.soporte.create({ data: soporte });
  }

  async actualizarSoporte(
    id: number,
    soporte: ActualizarSoporteDto,
  ): Promise<Soporte> {
    return this.prisma.soporte.update({ where: { id }, data: soporte });
  }

  async eliminarSoporte(id: number): Promise<Soporte> {
    return this.prisma.soporte.delete({ where: { id } });
  }
}
