import { Controller, Get, Query, StreamableFile } from '@nestjs/common';
import { AppService } from './app.service';
import { createReadStream } from 'fs';
import { join } from 'path';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): { foo: string } {
    return { foo: this.appService.getHello() };
  }

  @Get('/file')
  getFile(@Query() uuid: string): StreamableFile {
    console.info(`추후 ${uuid} 로 별개 개발`);
    const file = createReadStream(join(process.cwd(), 'json', 'info.json'));
    return new StreamableFile(file);
  }
}
