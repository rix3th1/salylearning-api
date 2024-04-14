import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { Public } from '../public.decorator';
import { ContactosService } from './contactos.service';
import { ActualizarContactoDto, CrearContactoDto } from './dto/contactos.dto';
import { Contacto } from './entities/contacto.entity';

@ApiTags('contactos')
@Controller('contactos')
export class ContactosController {
  constructor(private readonly contactosService: ContactosService) {}

  @ApiBearerAuth('access-token')
  @Get()
  @ApiOperation({
    summary: 'Obtener todos los contactos',
    description: 'Obtiene todos los contactos de la base de datos',
  })
  @ApiOkResponse({
    description: 'Contactos encontrados',
    type: [Contacto],
  })
  async obtenerContactos() {
    return await this.contactosService.obtenerContactos();
  }

  @ApiBearerAuth('access-token')
  @Get(':id')
  @ApiOperation({
    summary: 'Obtener un contacto por su ID',
    description: 'Obtiene un contacto de la base de datos por su ID',
  })
  @ApiOkResponse({
    description: 'Contacto encontrado',
    type: Contacto,
  })
  async obtenerContacto(@Param('id') id: string) {
    try {
      return await this.contactosService.obtenerContacto(+id);
    } catch (error) {
      console.error(error.message);

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException('No se encontró el contacto solicitado');
        }
      }
    }
  }

  @Post()
  @Public()
  @ApiTags('publico')
  @ApiOperation({
    summary: 'Crear un contacto',
    description: 'Crea un contacto en la base de datos',
  })
  @ApiCreatedResponse({
    description: 'Contacto creado',
    type: Contacto,
  })
  async crearContacto(@Body() contacto: CrearContactoDto) {
    try {
      return await this.contactosService.crearContacto(contacto);
    } catch (error) {
      console.error(error.message);
      throw new InternalServerErrorException('Error al crear el contacto');
    }
  }

  @ApiBearerAuth('access-token')
  @Patch(':id')
  @ApiOperation({
    summary: 'Actualizar un contacto',
    description: 'Actualiza un contacto en la base de datos',
  })
  @ApiOkResponse({
    description: 'Contacto actualizado',
    type: Contacto,
  })
  async actualizarContacto(
    @Param('id') id: string,
    @Body() contacto: ActualizarContactoDto,
  ) {
    try {
      return await this.contactosService.actualizarContacto(+id, contacto);
    } catch (error) {
      console.error(error.message);

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException('No se encontró el contacto solicitado');
        }
      }
    }
  }

  @ApiBearerAuth('access-token')
  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar un contacto',
    description: 'Elimina un contacto de la base de datos',
  })
  @ApiOkResponse({
    description: 'Contacto eliminado',
    type: Contacto,
  })
  async eliminarContacto(@Param('id') id: string) {
    try {
      return await this.contactosService.eliminarContacto(+id);
    } catch (error) {
      console.error(error.message);

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException('No se encontró el contacto solicitado');
        }
      }
    }
  }
}
