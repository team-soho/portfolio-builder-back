import { StreamableFile } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { createReadStream } from 'fs';
import { join } from 'path';
import { DownloadController } from './download.controller';
import { DownloadService } from './download.service';
import { createInputDataDto } from './test-data';

describe('DownloadController', () => {
  let controller: DownloadController;
  let service: DownloadService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DownloadController],
      providers: [
        {
          provide: DownloadService,
          useValue: {
            archive: jest
              .fn()
              .mockImplementation(async () =>
                createReadStream(join(__dirname, 'dummyPath', 'dummyFile.zip')),
              ),
          },
        },
      ],
    }).compile();

    controller = module.get<DownloadController>(DownloadController);
    service = module.get<DownloadService>(DownloadService);
  });

  it('should return StreamableFile', async () => {
    const inputDataDto = createInputDataDto(); // 사용된 부분
    jest
      .spyOn(service, 'fileArchiving')
      .mockResolvedValueOnce(
        createReadStream(join(__dirname, 'dummyPath', 'dummyFile.zip')),
      );

    const result = await controller.getArchive(inputDataDto);
    expect(result).toBeInstanceOf(StreamableFile);
  });
});
