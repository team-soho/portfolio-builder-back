import { IsString, IsArray, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Project } from './info.dataType';

export class CompanyDto {
  @ApiProperty()
  @IsString()
  readonly id: string;

  @ApiProperty()
  @IsArray()
  readonly date: [string, string];

  @ApiProperty()
  @IsString()
  readonly name: string;

  @ApiProperty()
  @IsString()
  readonly nameEn: string;

  @ApiProperty()
  @IsString()
  readonly position: string;

  @ApiProperty({ type: Array<Project> })
  @IsArray()
  readonly projects: Array<Project>;
}

export class WorkExperienceDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly id: string;

  @ApiProperty()
  @IsString()
  readonly label: string;

  @ApiProperty({ type: [CompanyDto] })
  @IsArray()
  readonly companies: CompanyDto[];
}
