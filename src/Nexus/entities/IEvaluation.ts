import { IEvaluatedResponse } from './IEvaluatedResponse';
import { ISpecification } from './ISpecification';

export interface IEvaluation {
  responses: IEvaluatedResponse[];
  specification: ISpecification;
}
