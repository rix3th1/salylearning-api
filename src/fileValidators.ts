import { HttpStatus, ParseFilePipeBuilder } from '@nestjs/common';

export const oneKb = 1024;

export const newImgValidator = (
  fileType: string | RegExp,
  maxSize: number,
  required: boolean,
) => {
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
      fileIsRequired: required,
    });
};

export const portadaImgValidators = (required: boolean = true) =>
  newImgValidator('image/png', 300 * oneKb, required);
export const fotoPerfilValidators = (required: boolean = true) =>
  newImgValidator(new RegExp('image/(jpeg|png)'), 500 * oneKb, required);
