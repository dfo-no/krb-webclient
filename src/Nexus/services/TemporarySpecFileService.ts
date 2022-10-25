import localforage from 'localforage';

import { IFile } from '../../models/IFile';

export class TemporarySpecFileService {
  private db: LocalForage;

  THERE_IS_ONLY_ONE_SPECFILE_AT_A_TIME = 'THERE_IS_ONLY_ONE_SPECFILE_AT_A_TIME';

  constructor() {
    this.db = localforage.createInstance({
      name: 'specFiles',
    });
  }

  async storeSpecFile(evaluationSpecification: IFile) {
    await this.db.setItem(
      this.THERE_IS_ONLY_ONE_SPECFILE_AT_A_TIME,
      evaluationSpecification
    );
  }

  async getSpecFile(): Promise<IFile | null> {
    return this.db.getItem(this.THERE_IS_ONLY_ONE_SPECFILE_AT_A_TIME);
  }
}
