import { ISelectable } from './ISelectable';

export interface IFileUploadAlternative extends ISelectable {
  file?: string;
  fileEndings: string;
}
