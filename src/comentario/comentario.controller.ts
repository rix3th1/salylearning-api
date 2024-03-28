import {
  Body,
  Controller,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { ComentarioService } from './comentario.service';
import { CrearComentarioDto } from './dto/comentario.dto';

@Controller('comentario')
export class ComentarioController {
  constructor(private readonly comentarioService: ComentarioService) {}

  @Post()
  async crearComentario(@Body() comentario: CrearComentarioDto) {
    try {
      return await this.comentarioService.crearComentario(comentario);
    } catch (error) {
      console.error(error.message);
      throw new InternalServerErrorException('Error al crear el comentario');
    }
  }
}
