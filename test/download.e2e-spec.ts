import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { DownloadService } from '../src/download/download.service';
import { DownloadModule } from '../src/download/download.module';
import { INestApplication } from '@nestjs/common';
import { Readable } from 'stream';

describe('Download', () => {
  let app: INestApplication;
  const downloadService = {
    archivee: () => {
      const fileContents = '압축 파일의 내용';
      const stream = new Readable();
      stream.push(fileContents); // 파일 내용을 스트림에 추가
      stream.push(null); // 스트림의 끝을 표시

      return Promise.resolve(stream);
    },
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [DownloadModule],
    })
      .overrideProvider(DownloadService)
      .useValue(downloadService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET download`, () => {
    return (
      request(app.getHttpServer())
        .get('/download')
        .expect(200)
        // 파일 content-type 확인.
        .expect('Content-Type', /zip/)
    );
  });

  afterAll(async () => {
    await app.close();
  });
});
