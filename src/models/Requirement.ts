import { RequirementLayout } from './RequirementLayout';

export interface Requirement {
  id: string;
  title: string;
  description: string;
  needId: string;
  type: string;
  layouts: RequirementLayout[];
}
