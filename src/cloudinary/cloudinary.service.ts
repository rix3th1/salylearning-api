import { Injectable } from '@nestjs/common';
import * as toStream from 'buffer-to-stream';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';

@Injectable()
export class CloudinaryService {
  async subirImagen(
    file: Express.Multer.File,
  ): Promise<UploadApiResponse | UploadApiErrorResponse | undefined> {
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream((error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
      toStream(file.buffer).pipe(upload);
    });
  }

  async eliminarImagen(public_id: string) {
    return v2.api.delete_resources([public_id]);
  }
}
