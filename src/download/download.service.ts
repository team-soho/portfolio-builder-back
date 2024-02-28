import { Injectable, StreamableFile } from '@nestjs/common';
import { InputDataDto } from './dto/input-data.dto';
import { join } from 'path';
import * as process from 'process';
import * as fs from 'fs';
import * as archiver from 'archiver';

@Injectable()
export class DownloadService {
  /**
   * html 파일로 data 변환
   * @param data
   */
  async htmlRewrite(data: InputDataDto): Promise<StreamableFile> {
    const path = [process.cwd(), 'static', data.theme];

    // template 이 될 로직
    const templateHtml = fs.readFileSync(join(...path, 'template'), {
      encoding: 'utf-8',
    });

    // TODO: import input data with html logic 추가
    console.log(templateHtml);
    // const htmlBuild = htmlBuild(InputDataDto, templateHtml);
    let htmlBuild = templateHtml;
    htmlBuild += test;

    /**
     *     TODO: 추후 {} 읽어서 데이터 변환하는 코드 작성,
     *     그 전까지는 read html 인척 유지
     */
    // file 쓰기 비동기 처리하여 다음 로직에서 대기
    return new Promise((resolve, reject) => {
      // write file
      const writeStream = fs.createWriteStream(join(...path, 'index.html'));

      writeStream.on('finish', () => {
        // 파일 쓰기 완료 시 파일을 다시 읽어서 StreamableFile로 변환
        const fileStream = fs.createReadStream(join(...path, 'index.html'));
        const streamableFile = new StreamableFile(fileStream);
        resolve(streamableFile);
      });

      // error handling
      writeStream.on('error', (error) => {
        reject(error);
      });

      // 데이터 쓰기
      writeStream.write(htmlBuild);
      writeStream.end();
    });
  }

  /**
   * 압축
   * @param htmlFile
   * @param theme
   */
  async fileArchiving(
    htmlFilePromise: Promise<StreamableFile>,
    theme: string,
  ): Promise<StreamableFile> {
    const path = [process.cwd(), 'static', theme];
    const htmlFile = await htmlFilePromise;
    const zipPath = join(process.cwd(), 'archived', 'test.zip');

    // create a file to stream archive data to.
    const output = fs.createWriteStream(zipPath);
    const archive = archiver('zip', {
      zlib: { level: 9 }, // Sets the compression level.
    });

    // listen for all archive data to be written
    // 'close' event is fired only when a file descriptor is involved
    output.on('close', function () {
      console.log(archive.pointer() + ' total bytes');
      console.log('Done');
    });

    // This event is fired when the data source is drained no matter what was the data source.
    // It is not part of this library but rather from the NodeJS Stream API.
    // @see: https://nodejs.org/api/stream.html#stream_event_end
    output.on('end', function () {
      console.log('Data has been drained');
    });

    // good practice to catch warnings (ie stat failures and other non-blocking errors)
    archive.on('warning', function (err) {
      if (err.code === 'ENOENT') {
        // log warning
      } else {
        // throw error
        throw err;
      }
    });

    // good practice to catch this error explicitly
    archive.on('error', function (err) {
      throw err;
    });

    // pipe archive data to the file
    archive.pipe(output);

    // append a file from stream
    archive.append(htmlFile.getStream(), { name: 'index.html' });

    /* 파일 별로 따로 넣는 방법
    // append a file from buffer
    const cssFile = fs.readFile(
      join(...path, ''),
      { encoding: 'utf-8' },
      (err) => {
        throw err;
      },
    );
    archive.append(cssFile, {
      name: 'style.css',
    });
    */

    // append files from a sub-directory, putting its contents at the root of archive
    archive.directory(join(...path), false);

    // finalize the archive (ie we are done appending files but streams have to finish yet)
    // 'close', 'end' or 'finish' may be fired right after calling this method so register to them beforehand
    await archive.finalize();

    return new Promise((resolve, reject) => {
      output.on('finish', () => {
        // 파일 쓰기 완료 시 파일을 다시 읽어서 StreamableFile로 변환
        const fileStream = fs.createReadStream(zipPath);
        const streamableFile = new StreamableFile(fileStream);
        resolve(streamableFile);
      });

      // error handling
      output.on('error', (error) => {
        reject(error);
      });
      output.end();
    });
  }
}
