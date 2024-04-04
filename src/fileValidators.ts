import { HttpStatus, ParseFilePipeBuilder } from '@nestjs/common';

export const oneKb = 1024;

export const newImgValidator = (fileType: string | RegExp, maxSize: number) => {
  return new ParseFilePipeBuilder()
    .addFileTypeValidator({ fileType })
    .addMaxSizeValidator({
      maxSize,
      message(maxSize) {
        return `El tamaño de la imagen no debe ser mayor a ${maxSize / 1024}kb`;
      },
    })
    .build({
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    });
};

export const portadaImgValidators = newImgValidator('image/png', 300 * oneKb);
