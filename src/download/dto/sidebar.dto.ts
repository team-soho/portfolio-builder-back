import { CommonDataDto } from './common-data.dto';

interface urls {
  id: string;
  label: string;
  url: string;
}
interface menuList {
  label: string;
  url: string;
}
export class SidebarDto extends CommonDataDto {
  name: string;
  enName: string;
  phone: number;
  email: string;
  urls: [urls];
  menuList: [menuList];
}
