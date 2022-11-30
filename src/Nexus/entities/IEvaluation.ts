import { IEvaluatedResponse } from './IEvaluatedResponse';
import { ISpecification } from './ISpecification';

export interface IEvaluation {
  customization: 'kravbank:evaluation:v1.0';
  responses: IEvaluatedResponse[];
  specification: ISpecification;
}
