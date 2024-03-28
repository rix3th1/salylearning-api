import {
  Body,
  Controller,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { ComentariosService } from './comentarios.service';
import { CrearComentarioDto } from './dto/comentario.dto';

@Controller('comentarios')
export class ComentariosController {
  constructor(private readonly comentariosService: ComentariosService) {}

  @Post()
  async crearComentario(@Body() comentario: CrearComentarioDto) {
    try {
      return await this.comentariosService.crearComentario(comentario);
    } catch (error) {
      console.error(error.message);
      throw new InternalServerErrorException('Error al crear el comentario');
    }
  }
}
