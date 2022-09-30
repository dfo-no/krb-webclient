import { IFile } from '../../models/IFile';
import { ISpecification } from './ISpecification';

type SpecificationFile = {
  id: string;
  file: IFile;
  specification: ISpecification;
};

export type { SpecificationFile };
