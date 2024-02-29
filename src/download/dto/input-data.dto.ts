import { SidebarDto } from './sidebar.dto';
import { InfoDto } from './info.dto';
import { PortfolioDto } from './portfolio.dto';

export class InputDataDto {
  theme: string;
  sidebar: SidebarDto;
  info: InfoDto;
  portfolio: PortfolioDto;
}
