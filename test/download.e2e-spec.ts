import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { DownloadModule } from '../src/download/download.module';
import { createInputDataDto } from '../src/download/test-data';

describe('Download', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [DownloadModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/POST download`, () => {
    const payload = createInputDataDto();

    return request(app.getHttpServer())
      .post('/download')
      .send(payload)
      .expect(201)
      .expect('Content-Type', /zip/);
  });

  afterAll(async () => {
    await app.close();
  });
});
