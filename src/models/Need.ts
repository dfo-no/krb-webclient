import { Requirement } from './Requirement';

export interface Need {
  id: string;
  title: string;
  description: string;
  needs: Need[];
  requirements: Requirement[];
}
