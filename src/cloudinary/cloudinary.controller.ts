import { Controller, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CloudinaryService } from './cloudinary.service';
import { myconfig } from './config';
import { Public } from 'src/public.decorator';

@ApiBearerAuth('access-token')
@ApiTags('cloudinary')
@Controller('cloudinary')
export class CloudinaryController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  @Public()
  @Post('sign')
  @ApiOperation({
    summary: 'Sign Cloudinary',
    description: 'Sign Cloudinary',
  })
  @ApiOkResponse({
    description: 'Sign Cloudinary',
    schema: {
      title: 'Sign Cloudinary',
      description: 'Sign Cloudinary',
      example: {
        signature: '',
        timestamp: '',
        cloudname: '',
        apikey: '',
      },
    },
  })
  async signCloudinary() {
    const sig = await this.cloudinaryService.signCloudinary();
    const cloudName = myconfig.cloud_name;
    const apiKey = myconfig.api_key;

    return {
      signature: sig.signature,
      timestamp: sig.timestamp,
      cloudname: cloudName,
      apikey: apiKey,
    };
  }
}
