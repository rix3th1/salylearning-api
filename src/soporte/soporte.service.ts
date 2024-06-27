import { Injectable } from '@nestjs/common';
import { sendEmail } from '../nodemailer';
import { PrismaService } from '../prisma/prisma.service';
import { ActualizarSoporteDto, CrearSoporteDto } from './dto/soporte.dto';
import { Soporte } from './entities/soporte.entity';

@Injectable()
export class SoporteService {
  constructor(private prisma: PrismaService) {}

  async enviarGraciasPorContactarSoporte(
    to: string,
    payload: { username: string; p_nombre: string; p_apellido: string },
  ) {
    const { username, p_nombre, p_apellido } = payload;
    const html = `
      <h1>Gracias por contactar a Salylearning</h1>
      <p>Sr. usuario <strong>${username}</strong>, <strong>${p_nombre} ${p_apellido}</strong>, por contactar con nosotros, nos ha permitido ofrecerte soporte. Por favor, espera un poco más para que te contactemos.</p>
      <p>Saludos cordiales,</p>
      <p>El equipo de Salylearning</p>
    `;

    return sendEmail(to, 'Gracias por contactar a Salylearning', html);
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
