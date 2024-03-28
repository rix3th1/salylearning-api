import {
  Body,
  Controller,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { ContactosService } from './contactos.service';
import { CrearContactoDto } from './dto/contactos.dto';

@Controller('contactos')
export class ContactosController {
  constructor(private readonly contactosService: ContactosService) {}

  @Post()
  async crearContacto(@Body() contacto: CrearContactoDto) {
    try {
      return await this.contactosService.crearContacto(contacto);
    } catch (error) {
      console.error(error.message);
      throw new InternalServerErrorException('Error al crear el contacto');
    }
  }
}
