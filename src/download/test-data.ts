import { SidebarDto } from './dto/sidebar.dto';
import {
  InfoDto,
  Section,
  About,
  Skill,
  SectionExperience,
  SectionSimpleList,
} from './dto/info.dto';
import { PortfolioDto } from './dto/portfolio.dto';

import { InputDataDto } from './dto/input-data.dto';
// SidebarDto 생성
const sidebarDto = new SidebarDto();
sidebarDto.componentType = 'list';
sidebarDto.name = 'John Doe';
sidebarDto.enName = 'John Doe';
sidebarDto.phone = 123456789;
sidebarDto.email = 'john.doe@example.com';
sidebarDto.urls = [
  {
    id: '1',
    label: 'GitHub',
    url: 'https://github.com/johndoe',
  },
];
sidebarDto.menuList = [
  {
    label: 'Home',
    url: '/home',
  },
];

// InfoDto 관련 클래스 인스턴스 생성
const about = new About();
about.componentType = 'list-company'; // 'minimal'로도 설정 가능
about.job = 'Software Engineer';
about.date = '2024-01-01';
about.aboutMe = 'Passionate about technology';

const skill = new Skill();
skill.componentType = 'skill-text'; // 'skill-block'로도 설정 가능

const sectionExperience = new SectionExperience();
sectionExperience.date = '2024-01-01';
sectionExperience.title = 'Project Title';
sectionExperience.subTitle = 'Sub Title';
sectionExperience.description = 'Project Description';
sectionExperience.items = [
  {
    date: '2024-01-01',
    title: 'Item Title',
    url: 'https://example.com',
  },
];

const sectionSimpleList = new SectionSimpleList();
sectionSimpleList.componentType = 'simple-list';
sectionSimpleList.label = 'Simple List';
sectionSimpleList.items = [
  {
    date: '2024-01-01',
    text: 'List Item',
  },
];

const section = new Section();
section.componentType = 'skill-text'; // 'skill-block'로도 설정 가능
section.label = 'Section Label';
// `items`에는 `SectionExperience[]` 또는 `SectionSimpleList[]` 중 하나를 할당해야 합니다.
// 예시에서는 `SectionExperience[]`을 사용합니다.
section.items = [sectionExperience];

const infoDto = new InfoDto();
infoDto.componentType = 'info-component';
infoDto.about = about;
infoDto.skill = { componentType: 'skill-text', Skill: [skill] };
infoDto.sections = [section];

// InputDataDto 생성 및 내보내기
export const createInputDataDto = (): InputDataDto => {
  const inputDataDto = new InputDataDto();
  inputDataDto.theme = 'dark';
  inputDataDto.sidebar = sidebarDto; // 앞서 생성한 SidebarDto 인스턴스
  inputDataDto.info = infoDto; // 여기에 InfoDto 인스턴스를 할당
  // inputDataDto.portfolio = portfolioDto; // PortfolioDto 관련 코드는 생략
  return inputDataDto;
};
