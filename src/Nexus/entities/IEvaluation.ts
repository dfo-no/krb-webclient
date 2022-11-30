import { IEvaluatedResponse } from './IEvaluatedResponse';
import { ISpecification } from './ISpecification';

export const EVALUATION_CUSTOMIZATION = 'kravbank:evaluation:v1.0';

export interface IEvaluation {
  customization: typeof EVALUATION_CUSTOMIZATION;
  responses: IEvaluatedResponse[];
  specification: ISpecification;
}
