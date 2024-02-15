import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { InfoService } from './info.service';
import { UpdateInfoDto } from './dto/update-info.dto';
import { ApiBody, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { CreateInfoDto } from './dto/create-info.dto';

@Controller('info')
export class InfoController {
  constructor(private readonly infoService: InfoService) {}

  @Post()
  @ApiOperation({
    summary: 'info 추가',
  })
  @ApiBody({
    type: CreateInfoDto,
  })
  create(@Body() createInfoDto: CreateInfoDto) {
    return this.infoService.create(createInfoDto);
  }

  @ApiOperation({
    summary: 'info 추가',
    description: 'info 수정',
  })
  @ApiQuery({ name: 'key', description: 'json | data', enum: ['json', 'data'] })
  @Get(':key')
  findAll(@Param('key') key: string): CreateInfoDto {
    return this.infoService.findAll(key);
  }

  @Get()
  findOne() {
    return ``;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInfoDto: UpdateInfoDto) {
    return this.infoService.update(+id, updateInfoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.infoService.remove(+id);
  }
}
