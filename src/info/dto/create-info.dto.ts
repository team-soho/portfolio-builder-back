import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray, ValidateNested, IsObject } from 'class-validator';
import { Type } from 'class-transformer';
import { WorkExperienceDto } from './workExperience.dto';
import { Photo, ResumeItemList, InfoSkill } from './info.dataType';
export class CreateInfoDto {
  @ApiProperty()
  @IsString()
  readonly id: string;

  @ApiProperty()
  @IsString()
  readonly name: string;

  @ApiProperty()
  @IsString()
  readonly year: string;

  @ApiProperty()
  @IsString()
  readonly jop: string;

  @ApiProperty({ type: Array<Photo> })
  @IsArray()
  readonly photos: Photo[];

  @ApiProperty()
  @ValidateNested()
  @Type(() => Object)
  readonly introduce: { label: string; description: string };

  @ApiProperty({})
  @IsObject()
  readonly skills: InfoSkill;

  @ApiProperty()
  @ValidateNested()
  @Type(() => WorkExperienceDto)
  readonly workExperience: WorkExperienceDto;

  @ApiProperty({ type: Array<ResumeItemList> })
  @IsArray()
  readonly resumeItems: Array<ResumeItemList>;
}
