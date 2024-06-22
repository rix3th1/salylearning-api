import { Injectable } from '@nestjs/common';
import { EstadoCuestionario } from '@prisma/client';
import PDFDocumentWithTables from 'pdfkit-table';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ReportesPdfService {
  constructor(private prisma: PrismaService) {}

  async generatePDF(data: any): Promise<Buffer> {
    const pdfBuffer: Buffer = await new Promise((resolve) => {
      const doc = new PDFDocumentWithTables({
        size: 'LETTER',
        bufferPages: true,
        margin: 30,
      });

      const rows = data.map((item: any, index: number) => [
        index + 1,
        `${item.estudiante.usuario.p_nombre} ${item.estudiante.usuario.p_apellido}`,
        Number(item.calificacion).toFixed(1),
        item.estudiante.puntaje_total,
        item.estudiante.usuario.grado_usuario.grados.nom_grado,
      ]);

      (async function () {
        const res = await fetch(
          'https://raw.githubusercontent.com/rojasricor/salylearning-app/main/public/icon.png',
        );
        const image = await res.arrayBuffer();

        function addHeader(doc: PDFDocumentWithTables) {
          doc
            .image(image, 30, 15, {
              width: 50,
              link: 'https://salylearning.vercel.app/',
            })
            .fontSize(8)
            .text(
              `Salylearning / Reporte de Calificaciones - ${new Date().toLocaleString()}`,
              0,
              33,
              {
                align: 'center',
              },
            );
          doc.moveDown(5);
          doc
            .moveTo(30, 70)
            .lineTo(doc.page.width - 30, 70)
            .stroke();
        }

        // Event listener to add header on new page
        doc.on('pageAdded', () => {
          addHeader(doc);
        });

        // Add the initial header
        addHeader(doc);

        doc
          .fontSize(20)
          .text('Calificaciones de Estudiantes Por Grado', { align: 'center' });
        doc.moveDown();

        const tableData = {
          headers: [
            'No.',
            'Nombre completo',
            'Calificación',
            'Puntaje Total',
            'Grado',
          ],
          rows: rows,
        };

        if (rows.length === 0) {
          doc
            .fontSize(10)
            .text('No hay calificaciones de estudiantes por grado', {
              align: 'center',
            });
          doc.moveDown();
        } else {
          await doc.table(tableData, {
            prepareHeader: () => doc.font('Helvetica-Bold').fontSize(12),
            prepareRow: () => doc.font('Helvetica').fontSize(10),
            columnsSize: [
              50, // No.
              200, // Nombre completo
              80, // Calificación
              100, // Puntaje Total
              120, // Grado
            ],
          });
        }
        doc.end();
      })();

      const buffer = [];
      doc.on('data', buffer.push.bind(buffer));
      doc.on('end', () => {
        const data = Buffer.concat(buffer);
        resolve(data);
      });
    });

    return pdfBuffer;
  }

  async obtenerCalificacionesEstudiantesPorGrado(id_grado: number) {
    return this.prisma.cuestionarioEstudiante.findMany({
      where: {
        estado: {
          not: {
            equals: EstadoCuestionario.PENDIENTE,
          },
        },
        estudiante: {
          usuario: {
            grado_usuario: {
              id_grado,
            },
          },
        },
      },
      select: {
        estado: true,
        calificacion: true,
        estudiante: {
          select: {
            puntaje_total: true,
            usuario: {
              select: {
                grado_usuario: {
                  select: {
                    grados: {
                      select: {
                        nom_grado: true,
                      },
                    },
                  },
                },
                p_nombre: true,
                s_nombre: true,
                p_apellido: true,
                s_apellido: true,
                email: true,
              },
            },
          },
        },
      },
    });
  }
}
