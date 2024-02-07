import { ApiProperty } from '@nestjs/swagger';

export class ResumeItemDto {
  @ApiProperty()
  readonly id: string;
  @ApiProperty()
  readonly label: string;
  @ApiProperty({
    type: 'array',
    items: {
      type: 'object',
      items: {
        type: 'string',
      },
    },
  })
  readonly items: {
    readonly id: string;
    readonly start: string;
    readonly end: string;
    readonly description: string;
  }[];
}
