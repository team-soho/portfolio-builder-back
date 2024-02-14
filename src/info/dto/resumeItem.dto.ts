import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { v4 as uuidv4 } from 'uuid';

interface Item {
  readonly id: string;
  readonly start: string;
  readonly end: string;
  readonly description: string;
}

export class ResumeItemDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  readonly label: string;

  @ApiProperty({
    type: () => [Object], // 배열 내부에 객체를 나타냄
    items: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        start: { type: 'string' },
        end: { type: 'string' },
        description: { type: 'string' },
      },
    },
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Array) // 배열을 나타냄
  readonly items: Item[];
}
