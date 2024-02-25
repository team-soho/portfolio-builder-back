import { Controller, Get, Body, StreamableFile, Header } from '@nestjs/common';
import { DownloadService } from './download.service';
import { InputDataDto } from './dto/input-data.dto';

@Controller('/download')
export class DownloadController {
  constructor(private readonly downloadService: DownloadService) {}
  @Get('')
  @Header('Content-Type', 'application/zip')
  async getArchive(@Body() data: InputDataDto): Promise<StreamableFile> {
    // html file 만듦
    const htmlFile: StreamableFile =
      await this.downloadService.htmlRewrite(data);

    // file 압축
    return await this.downloadService.fileArchiving(htmlFile, data.theme);
  }
}
