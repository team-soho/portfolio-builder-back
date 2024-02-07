import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsArray } from 'class-validator';
import { WorkExperienceDto } from './workExperience.dto';
import { ResumeItemDto } from './resumeItem.dto';

export class CreateInfoDto {
  @ApiProperty({
    description: '이름',
    default: '양성주',
  })
  @IsString()
  readonly name: string;
  @ApiProperty({
    description: '생년월일',
    default: '1995',
  })
  @IsString()
  readonly year: string;
  @ApiProperty({
    description: '직업 ',
    default: 'Backend Developer',
  })
  @IsString()
  readonly job: string;
  @ApiProperty({
    description: '사진 ',
    default: [
      { id: 'character', src: 'add image', blur: '' },
      { id: 'character', src: 'add image', blur: '' },
    ],
  })
  readonly photos: {
    readonly id: string;
    readonly src: string;
    readonly blur: string;
  }[];
  @ApiProperty({
    description: '자기소개 ',
    default: {
      label: '자기소개',
      description: '자기소개.',
    },
  })
  readonly introduce: {
    readonly label: string;
    readonly description: string;
  };
  @ApiProperty({
    description: '자기소개 ',
    default: {
      label: 'Skills',
      list: [
        { id: 'react', label: 'React.js' },
        { id: 'next', label: 'Next.js' },
        { id: 'typescript', label: 'Typescript' },
      ],
    },
  })
  readonly skills: {
    readonly id: string;
    readonly list: {
      readonly id: string;
      readonly label: string;
    }[];
  };
  @ApiProperty({
    description: '업무경험 ',
    default: {
      label: '업무경험',
      companies: [
        {
          id: 'angry',
          date: ['2020.10', '2023.05'],
          name: '에이아이에스',
          nameEn: 'AngryPeople',
          position: '개발팀 / 선임 / 백엔드 개발자',
          projects: [
            {
              id: 'd6c8831521c94fb4a0e05abdde6baa86',
              name: 'add name',
              date: ['2023.03', '2023.05'],
            },
          ],
        },
        {
          id: 'wego',
          date: ['2019.01', '2020.01'],
          name: '브이아이씨글로벌',
          nameEn: 'WeGo',
          position: '개발팀 / 사원 / SI 사업부',
          projects: [
            {
              id: '5ecea86349314d01b4e78afd4d6bf58a',
              name: 'add name',
              date: ['2019.06', '2019.10'],
            },
          ],
        },
      ],
    },
  })
  readonly workExperience: WorkExperienceDto[];
  @ApiProperty({
    description: '기타 항목',
    type: [ResumeItemDto],
    default: [
      {
        id: 'education',
        label: '학력',
        items: [
          {
            id: 'education-ko',
            start: '2019.02',
            end: '2022.08',
            description: '경주여자고등학교 / 이과계열 / 광고디자인과',
          },
          {
            id: 'education-sanggi',
            start: '2013.03',
            end: '2015.02',
            description: '안동대학교 / 자연대학 / 원예육종학',
          },
        ],
      },
    ],
  })
  readonly resumeItems: ResumeItemDto[];
}
