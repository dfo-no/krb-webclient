import { ISpecification } from '../../models/ISpecification';
import { IEvaluatedResponse } from './IEvaluatedResponse';

export interface IEvaluation {
  responses: IEvaluatedResponse[];
  specification: ISpecification;
}
