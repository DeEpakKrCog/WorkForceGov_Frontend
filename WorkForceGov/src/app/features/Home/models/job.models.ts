export interface JobOpening {
  id: number;
  jobTitle: string;
  employerName: string;
  location: string;
  description: string;
  salaryMin: number;
  salaryMax: number;
  postedDate: Date;
}