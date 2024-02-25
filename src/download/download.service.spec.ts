import { Test, TestingModule } from '@nestjs/testing';
import { DownloadService } from './download.service';
import { InputDataDto } from './dto/input-data.dto';
import { StreamableFile } from '@nestjs/common';
import { Readable } from 'stream';

describe('DownloadService', () => {
  let service: DownloadService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DownloadService],
    }).compile();

    service = module.get<DownloadService>(DownloadService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('htmlRewrite', () => {
    it('should return a Readable stream', async () => {
      const data: InputDataDto = {
        theme: 'A',
        /* 데이터 속성 채우기 */
      };
      const result = await service.htmlRewrite(data);
      expect(result).toBeInstanceOf(Readable);
    });
  });

  describe('fileArchiving', () => {
    it('should return a StreamableFile', async () => {
      const htmlFile: Readable = new Readable(); // 간단한 예시로 Readable 스트림 사용
      htmlFile.push('HTML content');
      htmlFile.push(null); // 스트림 끝을 나타냄
      const themeType: string = 'themeA';
      const result = await service.fileArchiving(htmlFile, themeType);
      expect(result).toBeInstanceOf(StreamableFile); // 또는 반환 타입에 맞게 조정
    });
  });
});
