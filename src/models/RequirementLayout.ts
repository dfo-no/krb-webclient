import { CodelistAlternative, ValueAlternative } from './Alternatives';

export interface RequirementLayout {
  id: string;
  requirementText: string;
  instruction: string;
  use_product: boolean;
  use_spesification: boolean;
  use_qualification: boolean;
  products: string[];
  alternatives: (CodelistAlternative | ValueAlternative)[];
}
