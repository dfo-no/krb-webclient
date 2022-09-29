import localforage from 'localforage';
import { ISpecification } from '../entities/ISpecification';
import SpecificationService from './SpecificationService';

export class EvaluationSpecificationStoreService {
  private db: LocalForage;

  constructor() {
    this.db = localforage.createInstance({
      name: 'evaluationSpecifications'
    });
  }

  async storeEvaluationSpecification(evaluationSpecification: ISpecification) {
    await this.db.setItem(evaluationSpecification.id, evaluationSpecification);
  }

  async getEvaluationSpecification(id: string): Promise<ISpecification> {
    const evaluationSpecification = await this.db.getItem<ISpecification>(id);
    if (evaluationSpecification) {
      return evaluationSpecification;
    } else {
      return SpecificationService.defaultSpecification();
    }
  }
}
