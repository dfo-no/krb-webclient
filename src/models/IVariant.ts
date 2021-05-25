import { QuestionTypes } from './QuestionTypes';

export interface IVariant {
  id: string;
  requirementText: string;
  instruction: string;
  use_Product: boolean;
  use_Spesification: boolean;
  use_Qualification: boolean;
  products: string[];
  alternatives: QuestionTypes;
}
