import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { InfoService } from '../src/info/info.service';
import { InfoModule } from '../src/info/info.module';
import { INestApplication } from '@nestjs/common';

describe('Info', () => {
  let app: INestApplication;
  const infoService = { findAll: () => ['test'] };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [InfoModule],
    })
      .overrideProvider(InfoService)
      .useValue(infoService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET info`, () => {
    return request(app.getHttpServer()).get('/info').expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
