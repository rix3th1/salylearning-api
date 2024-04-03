import {
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
} from '@nestjs/common';

export const fileValidators = new ParseFilePipe({
  validators: [
    new MaxFileSizeValidator({
      maxSize: 300 * 1024,
      message: 'El tamaño de la imagen no debe ser mayor a 300kb',
    }),
    new FileTypeValidator({ fileType: 'image/(png|jpeg)' }),
  ],
});
