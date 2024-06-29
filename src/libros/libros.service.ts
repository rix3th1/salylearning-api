import { BadGatewayException, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { sendEmail } from 'src/nodemailer';
import { PrismaService } from '../prisma/prisma.service';
import { ActualizarLibroDto, CrearLibroDto } from './dto/libros.dto';
import { Libro } from './entities/libro.entity';

@Injectable()
export class LibrosService {
  constructor(private prisma: PrismaService) {}

  @OnEvent('enviar-email-notificacion-nuevo-libro', { async: true })
  async enviarEmailNotificacionNuevoLibro({
    nom_libro,
    imagen_portada,
  }: CrearLibroDto) {
    const estudiantes = await this.prisma.estudiante.findMany({
      where: {
        usuario: { verificado: true },
      },
      select: {
        usuario: { select: { email: true } },
      },
    });

    // Map the array of estudiantes to an array of emails
    const destinations = estudiantes.map(
      (estudiante) => estudiante.usuario.email,
    );

    const html = `
      <h1>Nuevo libro disponible</h1>
      <p>Un nuevo libro ha sido agregado a Salylearning! Corre a disfrutarlo.</p>
      <h2>Libro:</h2>
      <p><strong>${nom_libro}</strong></p>
      <img src="${imagen_portada}" alt="Portada del libro">
      <p>Saludos cordiales,</p>
      <p>El equipo de Salylearning</p>
    `;

    const response = await sendEmail(
      destinations,
      'Nuevo libro disponible',
      html,
    );

    if (response.error) {
      throw new BadGatewayException(
        'Error al enviar el email de notificación de nuevo libro. Por favor, intenta de nuevo más tarde.',
      );
    }
  }

  async contarLibros(): Promise<number> {
    return this.prisma.libro.count();
  }

  async obtenerLibros(): Promise<Libro[]> {
    return this.prisma.libro.findMany();
  }

  async obtenerLibrosPopulares(): Promise<Libro[]> {
    return this.prisma.libro.findMany({
      take: 2,
      orderBy: {
        mis_libros: {
          _count: 'asc',
        },
      },
    });
  }

  async obtenerLibrosPorNombre(nom_libro: string): Promise<Libro[]> {
    return this.prisma.libro.findMany({
      where: { nom_libro: { contains: nom_libro } },
    });
  }

  async obtenerLibrosPorAutor(autor: string): Promise<Libro[]> {
    return this.prisma.libro.findMany({
      where: { autor: { contains: autor } },
    });
  }

  async obtenerLibrosPorEditorial(editorial: string): Promise<Libro[]> {
    return this.prisma.libro.findMany({
      where: { editorial: { contains: editorial } },
    });
  }

  async obtenerLibrosPorGeneroLiterario(
    genero_literario: string,
  ): Promise<Libro[]> {
    return this.prisma.libro.findMany({
      where: {
        genero_literario: { nom_genero: { contains: genero_literario } },
      },
    });
  }

  async obtenerLibro(id: number): Promise<Libro> {
    return this.prisma.libro.findUniqueOrThrow({
      where: { id },
      include: {
        libros_estudiante: true,
        mis_libros: true,
      },
    });
  }

  async crearLibro(libro: CrearLibroDto): Promise<Libro> {
    return this.prisma.libro.create({ data: libro });
  }

  async actualizarLibro(id: number, libro: ActualizarLibroDto): Promise<Libro> {
    return this.prisma.libro.update({ where: { id }, data: libro });
  }

  async eliminarLibro(id: number): Promise<Libro> {
    return this.prisma.libro.delete({ where: { id } });
  }
}
