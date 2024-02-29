// 필요한 모듈과 클래스를 NestJS 및 Node.js의 기본 라이브러리에서 가져옵니다.
import { StreamableFile } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { join } from 'path';
import { DownloadController } from './download.controller';
import { DownloadService } from './download.service';
import { createInputDataDto } from './test-data';
import { createReadStream } from 'fs'; // 테스트 데이터 생성 함수

describe('DownloadController', () => {
  // 테스트에 사용될 controller와 service 변수를 선언합니다.
  let controller: DownloadController;
  let service: DownloadService;

  beforeEach(async () => {
    // NestJS의 테스트 모듈을 설정합니다. 여기서는 DownloadController와 DownloadService를 테스트 모듈에 등록합니다.
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DownloadController], // 테스트할 컨트롤러
      providers: [DownloadService], // 실제 서비스를 사용하지만, 목(mock)을 사용하여 오버라이드 할 예정입니다.
    })
      .overrideProvider(DownloadService) // DownloadService의 제공자를 오버라이드합니다.
      .useValue({
        // fileArchiving 메서드를 목(mock)으로 대체합니다. 이 목은 비동기 함수를 모방하며, StreamableFile 인스턴스를 반환합니다.
        fileArchiving: jest
          .fn()
          .mockImplementation(
            async (htmlFile: Promise<StreamableFile>, theme: string) => {
              const stream = createReadStream(
                join(__dirname, 'dummyPath', 'dummyFile.zip'),
              ); // 가짜 파일 스트림을 생성합니다.
              return new StreamableFile(stream); // 생성된 스트림을 사용하여 StreamableFile 인스턴스를 반환합니다.
            },
          ),
        // htmlRewrite 메서드도 목으로 대체합니다. 이 목은 가짜 HTML 파일에 대한 StreamableFile 인스턴스를 반환합니다.
        htmlRewrite: jest
          .fn()
          .mockResolvedValue(
            new StreamableFile(
              createReadStream(join(__dirname, 'dummyPath', 'dummyHtml.html')),
            ),
          ),
      })
      .compile(); // 테스트 모듈을 컴파일합니다.

    // 컴파일된 테스트 모듈에서 DownloadController와 DownloadService의 인스턴스를 가져옵니다.
    controller = module.get<DownloadController>(DownloadController);
    service = module.get<DownloadService>(DownloadService);
  });

  it('should return StreamableFile', async () => {
    // createInputDataDto 함수를 사용하여 테스트에 사용될 입력 데이터를 생성합니다.
    const inputDataDto = createInputDataDto();
    // controller의 getArchive 메서드를 호출하고, 반환된 결과가 StreamableFile 인스턴스인지 검증합니다.
    const result = await controller.getArchive(inputDataDto);
    expect(result).toBeInstanceOf(StreamableFile); // 결과가 StreamableFile 타입인지 확인합니다.
  });
});
