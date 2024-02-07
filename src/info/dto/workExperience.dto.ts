export class WorkExperienceDto {
  readonly id: string;
  readonly date: string[];
  readonly name: string;
  readonly nameEn: string;
  readonly position: string;
  readonly projects: {
    readonly id: string;
    readonly name: string;
    readonly date: string[];
  }[];
}
