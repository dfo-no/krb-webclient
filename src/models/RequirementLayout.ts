import { CodelistAlternative, ValueAlternative } from './Alternatives';

export interface RequirementLayout {
  id: string;
  requirementText: string;
  instruction: string;
  use_Product: boolean;
  use_Spesification: boolean;
  use_Qualification: boolean;
  products: string[];
  alternatives: (CodelistAlternative | ValueAlternative)[];
}
