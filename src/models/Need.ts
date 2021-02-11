import { Requirement } from './Requirement';

export interface Need {
  id: number;
  title: string;
  description: string;
  needs: Need[];
  requirements: Requirement[];
}
