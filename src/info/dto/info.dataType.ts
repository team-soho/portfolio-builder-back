export interface DefaultItem {
  id: string;
  label: string;
}

export interface skill extends DefaultItem {
  light?: boolean;
}
export interface InfoSkill extends DefaultItem {
  list: Array<skill>;
}
export interface Photo {
  id: string;
  src: string;
  blur?: string;
}

export interface Project {
  id: string;
  name: string;
  date: [string, string]; // Assuming that date is an array of two strings
}
export interface ResumeItem {
  id: string;
  start: string;
  end: string;
  description: string;
}

export interface ResumeItemList extends DefaultItem {
  items: Array<ResumeItem>;
}
