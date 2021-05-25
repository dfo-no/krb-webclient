import { QuestionTypes } from './QuestionTypes';

export interface IVariant {
  id: string;
  requirementText: string;
  instruction: string;
  useProduct: boolean;
  useSpesification: boolean;
  useQualification: boolean;
  products: string[];
  questions: QuestionTypes;
}
