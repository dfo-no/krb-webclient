import localforage from 'localforage';
import { v4 as uuidv4 } from 'uuid';
import { ISpecification } from '../entities/ISpecification';
import SpecificationService from './SpecificationService';
import { SpecificationFile } from '../entities/SpecificationFile';
import { IFile } from '../../models/IFile';

export const INVALID_ID = 'THIS_IS_AN_INVALID_ID';

export const getDefaultSpecificationFile = (
  file: IFile,
  specification: ISpecification
): SpecificationFile => ({
  id: uuidv4(),
  file,
  specification
});

export const getInvalidSpecificationFile = (): SpecificationFile => {
  const invalidSpecification = getDefaultSpecificationFile(
    { name: '', lastModified: 0 },
    SpecificationService.defaultSpecification()
  );
  invalidSpecification.id = INVALID_ID;
  return invalidSpecification;
};
export class EvaluationSpecificationStoreService {
  private db: LocalForage;

  constructor() {
    this.db = localforage.createInstance({
      name: 'evaluationSpecifications'
    });
  }

  async storeEvaluationSpecification(
    evaluationSpecification: SpecificationFile
  ) {
    await this.db.setItem(evaluationSpecification.id, evaluationSpecification);
  }

  async getEvaluationSpecification(id: string): Promise<SpecificationFile> {
    const evaluationSpecification = await this.db.getItem<SpecificationFile>(
      id
    );
    if (evaluationSpecification) {
      return evaluationSpecification;
    } else {
      return getInvalidSpecificationFile();
    }
  }
}
