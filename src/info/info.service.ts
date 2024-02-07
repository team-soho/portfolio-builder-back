import { Injectable } from '@nestjs/common';
import { CreateInfoDto } from './dto/create-info.dto';
import { UpdateInfoDto } from './dto/update-info.dto';
import * as fs from 'fs';
import { join } from 'path';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class InfoService {
  create(createInfoDto: CreateInfoDto) {
    return 'This action adds a new info';
  }

  findAll(key: string): CreateInfoDto {
    const myClassInstance = plainToInstance(
      CreateInfoDto,
      JSON.parse(
        fs.readFileSync(join(__dirname, '..', '..', 'json', 'info.json'), {
          encoding: 'utf8',
        }),
      ),
    );

    return myClassInstance;
  }

  async findOne(id: number): Promise<string> {
    return `This action returns a #${id} info`;
  }

  update(id: number, updateInfoDto: UpdateInfoDto) {
    return `This action updates a #${id} info`;
  }

  remove(id: number) {
    return `This action removes a #${id} info`;
  }
}
