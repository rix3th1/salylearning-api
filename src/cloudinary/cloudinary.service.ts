import { Injectable } from '@nestjs/common';
import * as toStream from 'buffer-to-stream';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import { myconfig } from './config';

@Injectable()
export class CloudinaryService {
  async signCloudinary() {
    const apiSecret = myconfig.api_secret;

    const timestamp = Math.round(new Date().getTime() / 1000);

    const signature = v2.utils.api_sign_request(
      {
        timestamp: timestamp,
        eager: 'c_pad,h_300,w_400|c_crop,h_200,w_260',
        folder: 'salylearning-libros',
      },
      apiSecret,
    );

    return { timestamp, signature };
  }

  async uploadVideo(
    file: Express.Multer.File,
  ): Promise<UploadApiResponse | UploadApiErrorResponse | undefined> {
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream(
        { resource_type: 'video' },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );
      toStream(file.buffer).pipe(upload);
    });
  }

  async uploadImage(
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

  async deleteRes(public_id: string) {
    return v2.api.delete_resources([public_id]);
  }
}
