import { Injectable, StreamableFile } from '@nestjs/common';
import { InputDataDto } from './dto/input-data.dto';

@Injectable()
export class DownloadService {
  async htmlRewrite(data: InputDataDto) {
    return undefined;
  }

  async fileArchiving(htmlFile: StreamableFile, theme: string) {
    return undefined;
  }
}
