import { CommonDataDto } from './common-data.dto';

export class About {
  componentType: 'list-company' | 'minimal';
  job: string;
  date: string;
  aboutMe: string; // 자기소개
}

export class Skill {
  componentType: 'skill-text' | 'skill-block';
}

export class SectionExperience {
  date: string;
  title: string;
  subTitle: string;
  description: string;
  items: [
    {
      date: string;
      title: string;
      url: string;
    },
  ];
}

export class SectionSimpleList {
  componentType: string;
  label: string;
  items: [
    {
      date: string;
      text: string;
    },
  ];
}

export class Section {
  componentType: 'skill-text' | 'skill-block';
  label: string;
  items: [SectionExperience] | [SectionSimpleList];
}
export class InfoDto extends CommonDataDto {
  about: About;
  skill: { componentType: 'skill-text' | 'skill-block'; Skill: [Skill] };

  sections: [Section];
}
