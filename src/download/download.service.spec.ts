import { Test, TestingModule } from '@nestjs/testing';
import { DownloadService } from './download.service';
import { StreamableFile } from '@nestjs/common';
import * as fs from 'fs';
import { createInputDataDto } from './test-data';

jest.mock('fs', () => ({
  createReadStream: jest.fn().mockImplementation(() => ({
    pipe: jest.fn(), // Stream chaining을 위해 모킹
  })),
  createWriteStream: jest.fn().mockImplementation(() => ({
    on: jest.fn((event, callback) => {
      if (event === 'finish') {
        callback();
      }
    }),
    end: jest.fn(),
  })),
  readFileSync: jest.fn().mockReturnValue('mocked content'),
}));

jest.mock('archiver', () => {
  const mockArchiver = {
    pipe: jest.fn(),
    append: jest.fn(),
    directory: jest.fn(),
    on: jest.fn(),
    finalize: jest.fn(() => {
      // 'finish' 이벤트를 에뮬레이트하기 위해 콜백을 즉시 호출
      // 이전에 on 메서드로 등록된 'finish' 이벤트 콜백을 가정
      process.nextTick(() => {
        if (mockArchiver.on.mock.calls.length > 0) {
          const finishCallbacks = mockArchiver.on.mock.calls
            .filter((call) => call[0] === 'finish')
            .map((call) => call[1]);
          finishCallbacks.forEach((callback) => callback());
        }
      });
    }),
  };

  // finalize 호출 시 'finish' 이벤트 콜백들을 실행
  // on 메서드의 호출 정보를 추적하기 위해 mockImplementation 사용
  mockArchiver.on.mockImplementation((event) => {
    if (event === 'finish') {
      console.log('파일 쓰기 완료 시 파일을 다시 읽어서 StreamableFile로 변환');
    }
  });

  return jest.fn(() => mockArchiver);
});

describe('DownloadService', () => {
  let service: DownloadService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [DownloadService],
    }).compile();

    service = moduleRef.get<DownloadService>(DownloadService);
  });

  it('htmlRewrite should create and return a StreamableFile', async () => {
    const inputData = createInputDataDto();
    const result = await service.htmlRewrite(inputData);
    expect(result).toBeInstanceOf(StreamableFile);
    expect(fs.createWriteStream).toHaveBeenCalled();
    expect(fs.createReadStream).toHaveBeenCalled();
  });

  it('fileArchiving should create a zip and return a StreamableFile', async () => {
    const htmlFilePromise = Promise.resolve(
      new StreamableFile(Buffer.from('dummy content')),
    );
    const theme = 'test-theme';
    const result = await service.fileArchiving(htmlFilePromise, theme);
    expect(result).toBeInstanceOf(StreamableFile);
    // expect(archiver().finalize).toHaveBeenCalled(); // archiver가 압축 프로세스를 완료했는지 확인
    expect(fs.createWriteStream).toHaveBeenCalled(); // 출력 파일 스트림 생성 확인
  });
});
