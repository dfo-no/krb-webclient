import { CodelistAlternative, ValueAlternative } from './Alternatives';

export interface RequirementLayout {
  id: string;
  requirementText: string;
  instruction: string;
  alternatives: (CodelistAlternative | ValueAlternative)[];
}
